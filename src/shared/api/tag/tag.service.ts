import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import { TagsDtoSchema } from "./tag.contracts";

export class TagService {
  static tagsQuery(config: { signal?: AbortSignal }) {
    return api
      .get("tags", config)
      .then((response) =>
        KyContracts.responseContract(TagsDtoSchema, response),
      );
  }
}
