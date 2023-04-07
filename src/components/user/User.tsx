import { Link } from "react-router-dom";
import background from "../../assets/library.png";
import Submit from "../common/button/Submit";
import Input from "../common/input/Input";
import useUser from "./hooks/useUser";

function User() {
  const user = useUser();

  return (
    <div className="u__navbar--offset">
      <div className="container">
        <div className="signup grid grid-col-2">
          <div
            className="first-col"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="second-col">
            <div className="intro">
              <h2>
                Create an account<span className="u__third--color">.</span>
              </h2>
              <div className="intro__second-line">
                Already a member?{" "}
                <Link className="u__third--color" to="/signin">
                  Log In
                </Link>
                <span>.</span>
              </div>
            </div>
            <form
              onSubmit={user.handleOnSubmit}
              className="grid grid-col-2 gap-1"
            >
              <Input
                label="First name"
                placeholder="John"
                autoFocus={false}
                name="firstName"
                field={user.fields.firstName}
                onChange={user.handleOnChange}
              />
              <Input
                label="Last name"
                placeholder="Doe"
                autoFocus={false}
                name="lastName"
                field={user.fields.lastName}
                onChange={user.handleOnChange}
              />
              <Input
                label="Username"
                placeholder="johndoe"
                autoFocus={false}
                name="username"
                field={user.fields.username}
                onChange={user.handleOnChange}
                max={true}
              />
              <Input
                label="Email"
                placeholder="johndoe@gmail.com"
                autoFocus={false}
                name="email"
                field={user.fields.email}
                onChange={user.handleOnChange}
                max={true}
              />
              <Input
                type="password"
                label="Password"
                placeholder="johndoe_password"
                autoFocus={false}
                name="password"
                field={user.fields.password}
                onChange={user.handleOnChange}
                max={true}
              />
              <Submit text="Create account" isLoading={user.isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
