import { z } from "zod";
import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import {
  ArticleDtoSchema,
  ArticlesDtoSchema,
  CreateArticleDtoSchema,
  UpdateArticleDtoSchema,
} from "./article.contracts";
import {
  ArticlesParamsDto,
  ArticlesParamsQueryDto,
  CreateArticleDto,
  UpdateArticleDto,
} from "./article.types";

// export class TagService {
//   static tagsQuery(config: { signal?: AbortSignal }) {
//     return api
//       .get("tags", config)
//       .then((response) =>
//         KyContracts.responseContract(TagsDtoSchema, response),
//       );
//   }
// }

export class ArticleService {
  static async articlesQuery(config: {
    params: ArticlesParamsDto;
    signal?: AbortSignal;
  }): Promise<z.infer<typeof ArticlesDtoSchema>> {
    return api
      .get("articles", {
        searchParams: config.params,
        signal: config.signal,
      })
      .then((response) =>
        KyContracts.responseContract(ArticlesDtoSchema, response),
      );
  }

  static async articlesFeedQuery(config: {
    params: ArticlesParamsQueryDto;
    signal?: AbortSignal;
  }): Promise<z.infer<typeof ArticlesDtoSchema>> {
    const response = await api.get("articles/feed", {
      searchParams: config.params,
      signal: config.signal,
    });

    return KyContracts.responseContract(ArticlesDtoSchema, response);
  }

  static async articleQuery(
    slug: string,
    config: { signal?: AbortSignal },
  ): Promise<z.infer<typeof ArticleDtoSchema>> {
    const response = await api.get(`articles/${slug}`, {
      signal: config.signal,
    });

    return KyContracts.responseContract(ArticleDtoSchema, response);
  }

  static async createArticleMutation(data: {
    createArticleDto: CreateArticleDto;
  }): Promise<z.infer<typeof ArticleDtoSchema>> {
    const createArticleDto = KyContracts.requestContract(
      CreateArticleDtoSchema,
      data.createArticleDto,
    );

    const response = await api.post("articles", {
      json: { article: createArticleDto },
    });

    return KyContracts.responseContract(ArticleDtoSchema, response);
  }

  static deleteArticleMutation(slug: string) {
    return api.delete(`articles/${slug}`);
  }

  static async updateArticleMutation(
    slug: string,
    data: { updateArticleDto: UpdateArticleDto },
  ): Promise<z.infer<typeof ArticleDtoSchema>> {
    const updateArticleDto = KyContracts.requestContract(
      UpdateArticleDtoSchema,
      data.updateArticleDto,
    );

    const response = await api.put(`articles/${slug}`, {
      json: { article: updateArticleDto },
    });

    return KyContracts.responseContract(ArticleDtoSchema, response);
  }
}
