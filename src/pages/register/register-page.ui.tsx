import { Link } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { RegisterForm } from "@/features/session";

export function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">회원가입</h1>

            <p className="text-xs-center">
              <Link to={pathKeys.login()}>이미 계정이 있으신가요?</Link>
            </p>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
