import { z } from "zod";
import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import {
  CommentDtoSchema,
  CommentsDtoSchema,
  CreateCommentDtoSchema,
} from "./comment.contracts";
import { CreateCommentDto } from "./comment.types";

export class CommentService {
  static async commentsQuery(
    slug: string,
    config: { signal?: AbortSignal },
  ): Promise<z.infer<typeof CommentsDtoSchema>> {
    const response = await api.get(`articles/${slug}/comments`, {
      signal: config.signal,
    });
    return KyContracts.responseContract(CommentsDtoSchema, response);
  }

  static async createCommentMutation(
    slug: string,
    data: { createCommentDto: CreateCommentDto },
  ): Promise<z.infer<typeof CommentDtoSchema>> {
    const createCommentDto = KyContracts.requestContract(
      CreateCommentDtoSchema,
      data.createCommentDto,
    );
    const response = await api.post(`articles/${slug}/comments`, {
      json: { comment: createCommentDto },
    });
    return KyContracts.responseContract(CommentDtoSchema, response);
  }

  static async deleteCommentMutation(slug: string, id: number): Promise<void> {
    await api.delete(`articles/${slug}/comments/${id}`);
  }
}
