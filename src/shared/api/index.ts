import ky from "ky";
import { z } from "zod";
import { useSessionStore } from "@/shared/session";

export const api = ky.create({
  prefixUrl: `${import.meta.env.VITE_BASE_URL}`,
  hooks: {
    beforeRequest: [
      (request) => {
        const { session } = useSessionStore.getState();
        if (session) {
          request.headers.set("Authorization", `Bearer ${session.token}`);
        }
      },
    ],
    afterResponse: [
      (request, options, response) => {
        console.log(request, options);
        if (!response.ok) {
          return handleGenericError(response);
        }
      },
    ],
  },
});

export function handleGenericError(response: Response): void {
  response
    .json()
    .then((data) => {
      const validation = GenericErrorSchema.safeParse(data);

      if (!validation.success) {
        throw new Error(response.statusText || "An error occurred");
      }

      const message = formatValidationErrors(validation.data);

      throw new Error(message);
    })
    .catch(() => {
      throw new Error(response.statusText || "An unexpected error occurred");
    });
}

const GenericErrorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
  return Object.entries(data.errors)
    .map(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`).join("\n"),
    )
    .join("\n");
}
