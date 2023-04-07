import AnimateHeight from "react-animate-height";
import background from "../../assets/reading-girl.png";
import Submit from "../common/button/Submit";
import useAuth from "./hooks/useAuth";

function SignIn() {
  const auth = useAuth();

  return (
    <div className="container u__auth--margin-top">
      <div className="signin grid grid-col-2">
        <div
          className="first-col"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="second-col">
          <div className="intro">
            <h2>
              Welcome back<span className="u__third--color">.</span>
            </h2>
            <div className="intro__second-line">
              Enter your details below
              <span className="u__third--color">.</span>
            </div>
          </div>
          <form className="form" onSubmit={auth.handleOnSubmit}>
            <AnimateHeight
              duration={300}
              height={!Boolean(auth.fields.error) ? 0 : "auto"}
              className="form__error u__text-error--color"
            >
              {auth.fields.error}
            </AnimateHeight>
            <label className="form__label">
              Username
              <input
                type="text"
                autoComplete="off"
                placeholder="Username"
                name="username"
                value={auth.fields.username}
                onChange={auth.handleOnChange}
              />
            </label>
            <label className="form__label">
              Password
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                name="password"
                value={auth.fields.password}
                onChange={auth.handleOnChange}
              />
            </label>
            <Submit text="Log In" isLoading={auth.isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
