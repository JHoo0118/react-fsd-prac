import { z } from "zod";
import { KyContracts } from "@/shared/lib/ky";
import { api } from "../index";
import {
  CreateUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
  UserDtoSchema,
} from "./auth.contracts";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./auth.types";

export class AuthService {
  static async currentUserQuery(config: {
    signal?: AbortSignal;
  }): Promise<z.infer<typeof UserDtoSchema>> {
    // const response = await api.get("user", { signal: config.signal });
    // return KyContracts.responseContract(UserDtoSchema, response);

    return api
      .get("user", { signal: config.signal })
      .then((response) =>
        KyContracts.responseContract(UserDtoSchema, response),
      );
  }

  static async createUserMutation(data: {
    createUserDto: CreateUserDto;
  }): Promise<z.infer<typeof UserDtoSchema>> {
    const createUserDto = KyContracts.requestContract(
      CreateUserDtoSchema,
      data.createUserDto,
    );
    const response = await api.post("users", { json: { user: createUserDto } });
    return KyContracts.responseContract(UserDtoSchema, response);
  }

  static async loginUserMutation(data: {
    loginUserDto: LoginUserDto;
  }): Promise<z.infer<typeof UserDtoSchema>> {
    const loginUserDto = KyContracts.requestContract(
      LoginUserDtoSchema,
      data.loginUserDto,
    );
    const response = await api.post("users/login", {
      json: { user: loginUserDto },
    });
    return KyContracts.responseContract(UserDtoSchema, response);
  }

  static logoutUserMutation(): Promise<void> {
    return Promise.resolve();
  }

  static async updateUserMutation(data: {
    updateUserDto: UpdateUserDto;
  }): Promise<z.infer<typeof UserDtoSchema>> {
    const updateUserDto = KyContracts.requestContract(
      UpdateUserDtoSchema,
      data.updateUserDto,
    );
    const response = await api.put("user", { json: { user: updateUserDto } });
    return KyContracts.responseContract(UserDtoSchema, response);
  }
}
