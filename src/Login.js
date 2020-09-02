import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        setLoading(true);
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
        setLoading(false);
      } catch (error) {
        console.error("[error]", error);
        setError(error.message);
        setLoading(false);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3">
            <div className="box">
              <h3 className="title has-text-gray">Login</h3>
              <hr />
              {error && (
                <article className="message is-danger ">
                  <div className="message-body">{error}</div>
                </article>
              )}
              <form onSubmit={handleLogin}>
                <div className="field mt-4">
                  <label className="label has-text-left">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field mt-4">
                  <label className="label has-text-left">Password</label>

                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field mt-4">
                  <p className="control has-text-right">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`button is-primary ${
                        isLoading && "is-loading"
                      }`}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
