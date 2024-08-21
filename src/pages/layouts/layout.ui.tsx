import { useSuspenseQuery } from "@tanstack/react-query";
import { IoCreateOutline, IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { SessionQueries } from "@/shared/session";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <NavLink
          className="logo-font"
          to={pathKeys.home()}
        >
          conduit
        </NavLink>
        <span className="attribution">
          An interactive learning project from{" "}
          <a
            href="https://thinkster.io"
            target="_blank"
            rel="noreferrer"
          >
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}

export function BrandLink() {
  return (
    <NavLink
      className="navbar-brand"
      to={pathKeys.home()}
    >
      React
    </NavLink>
  );
}

export function HomeLink() {
  return (
    <NavLink
      className="nav-link"
      to={pathKeys.home()}
    >
      홈
    </NavLink>
  );
}

export function SignInLink() {
  return (
    <NavLink
      className="nav-link"
      to={pathKeys.login()}
    >
      로그인
    </NavLink>
  );
}

export function SignUpLink() {
  return (
    <NavLink
      className="nav-link"
      to={pathKeys.register()}
    >
      회원가입
    </NavLink>
  );
}

export function NewArticleLink() {
  return (
    <NavLink
      className="nav-link"
      to={pathKeys.editor.root()}
    >
      <IoCreateOutline size={16} />
      &nbsp;New Article
    </NavLink>
  );
}

export function SettingsProfileLink() {
  return (
    <NavLink
      className="nav-link"
      to={pathKeys.settings()}
    >
      <IoSettingsSharp size={16} />
      &nbsp;설정
    </NavLink>
  );
}

export function ProfileLink() {
  const { data: user } = useSuspenseQuery(SessionQueries.currentSessionQuery());

  return (
    <NavLink
      className="nav-link"
      to={pathKeys.profile.byUsername({ username: user.username })}
    >
      <img
        className="user-pic"
        src={user.image}
        alt={user.username}
      />
      {user.username}
    </NavLink>
  );
}
