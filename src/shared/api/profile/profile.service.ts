import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import { ProfileDtoSchema } from "./profile.contracts";

export class ProfileService {
  static profileQuery(username: string, config: { signal?: AbortSignal }) {
    return api
      .get(`profiles/${username}`, config)
      .then((response) =>
        KyContracts.responseContract(ProfileDtoSchema, response),
      );
  }

  static followProfileMutation(username: string) {
    return api
      .post(`profiles/${username}/follow`)
      .then((response) =>
        KyContracts.responseContract(ProfileDtoSchema, response),
      );
  }

  static unfollowProfileMutation(username: string) {
    return api
      .delete(`profiles/${username}/follow`)
      .then((response) =>
        KyContracts.responseContract(ProfileDtoSchema, response),
      );
  }
}
