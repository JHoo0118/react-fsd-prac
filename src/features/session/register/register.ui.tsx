import { zodResolver } from "@hookform/resolvers/zod";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authContractsDto, authTypesDto } from "@/shared/api/auth";
import { compose } from "@/shared/lib/react";
import { hasMessages } from "@/shared/lib/react-hook-form";
import { pathKeys } from "@/shared/lib/react-router";
import { ErrorHandler, logError } from "@/shared/ui/error-handler";
import { ErrorList } from "@/shared/ui/error-list";
import { useRegisterMutation } from "./register.mutation";

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const RegisterForm = enhance(() => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<authTypesDto.CreateUserDto>({
    mode: "onTouched",
    resolver: zodResolver(authContractsDto.CreateUserDtoSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const { mutate: createUser, isPending } = useRegisterMutation({
    onSuccess: async (response) => {
      const { username } = response.user;
      navigate(pathKeys.profile.byUsername({ username }));
    },

    onError(error) {
      setError("root", { message: error.message });
    },
  });

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean);

  const onSubmit = (createUserDto: authTypesDto.CreateUserDto) =>
    createUser(createUserDto);

  return (
    <>
      {hasMessages(errors) && <ErrorList errors={errors} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          className="form-group"
          disabled={isPending}
        >
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="사용자명"
            {...register("username")}
          />
        </fieldset>
        <fieldset
          className="form-group"
          disabled={isPending}
        >
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="이메일"
            {...register("email")}
          />
        </fieldset>
        <fieldset
          className="form-group"
          disabled={isPending}
        >
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={!canSubmit}
        >
          회원가입
        </button>
      </form>
    </>
  );
});
