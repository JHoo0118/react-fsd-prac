import { queryOptions } from "@tanstack/react-query";
import { TagService } from "@/shared/api/tag";
import { queryClient } from "@/shared/lib/react-query";
import { transformTagsDtoToTags } from "./tag.lib";
import { Tags } from "./tag.types";

export class TagQueries {
  static readonly keys = {
    root: ["comment"] as const,
  };

  static tagsQuery() {
    return queryOptions({
      queryKey: ["tags"],
      queryFn: async ({ signal }) => {
        const response = await TagService.tagsQuery({ signal });
        return transformTagsDtoToTags(response);
      },

      initialData: () => queryClient.getQueryData<Tags>(["tags"]),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(["tags"])?.dataUpdatedAt,
    });
  }
}
