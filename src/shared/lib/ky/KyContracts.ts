import { ZodType } from "zod";
import { KyValidationError } from "./KyValidationError";

export class KyContracts {
  static async responseContract<Data>(
    schema: ZodType<Data>,
    response: Response,
  ): Promise<Data> {
    const data = await response.json();
    const validation = schema.safeParse(data);

    if (validation.error) {
      throw new KyValidationError(response, validation.error.errors);
    }

    return validation.data;
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown): Data {
    const validation = schema.safeParse(data);

    if (validation.error) {
      throw new KyValidationError(validation.error.errors);
    }

    return validation.data;
  }
}
