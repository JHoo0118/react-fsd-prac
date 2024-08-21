import { z } from "zod";
import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import { FavoriteArticleDtoSchema } from "./favorite.contracts";

export class FavoriteService {
  static async favoriteArticleMutation(
    slug: string,
  ): Promise<z.infer<typeof FavoriteArticleDtoSchema>> {
    const response = await api.post(`articles/${slug}/favorite`);
    return KyContracts.responseContract(FavoriteArticleDtoSchema, response);
  }

  static async unfavoriteArticleMutation(
    slug: string,
  ): Promise<z.infer<typeof FavoriteArticleDtoSchema>> {
    const response = await api.delete(`articles/${slug}/favorite`);
    return KyContracts.responseContract(FavoriteArticleDtoSchema, response);
  }
}
