import AnimateHeight from "react-animate-height";
import bg from "../../assets/library-girl.png";
import Submit from "../common/button/Submit";
import useAuth from "./hooks/useAuth";

function SignIn() {
  const [fields, onChange, isLoading, onSubmit] = useAuth();

  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="signin grid grid-col-2">
          <div
            className="first-col"
            style={{ backgroundImage: `url(${bg})` }}
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
            <form className="form" onSubmit={onSubmit}>
              <AnimateHeight
                duration={300}
                height={!Boolean(fields.error) ? 0 : "auto"}
                className="form__error u__text-error--color"
              >
                {fields.error}
              </AnimateHeight>
              <label className="form__label">
                Username
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Username"
                  name="username"
                  value={fields.username}
                  onChange={onChange}
                />
              </label>
              <label className="form__label">
                Password
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  name="password"
                  value={fields.password}
                  onChange={onChange}
                />
              </label>
              <Submit text="Log In" isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
