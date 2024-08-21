import { Link } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { LoginForm } from "@/features/session";

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">로그인</h1>

            <p className="text-xs-center">
              <Link to={pathKeys.register()}>계정이 없으신가요?</Link>
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
