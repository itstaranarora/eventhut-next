import Link from "next/link";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

function Login() {
  const { user, loginUser } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (identifier === "") {
      alert("Please enter valid username and password");
      setLoading(false);
      return;
    }
    loginUser(identifier);
    setLoading(false);
  };

  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className="login">
      <div className="login__left">
        <Link href="/">
          <a className="login__brand">
            <img src="/Logo.svg" className="login__logo" alt="eventhut logo" />
          </a>
        </Link>
        <div className="login__content">
          <h3>Sign in to Eventhut</h3>
          <form className="login__form">
            <div className="login__item">
              <span>Your Email</span>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="itstaranarora@gmail.com"
              />
            </div>
            {/* <div className="login__item">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
              />
            </div> */}
            <button onClick={handleSubmit} className="login__button">
              {loading ? <CircularProgress color="#fff" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
      <div className="login__right">
        <h2>Hello Friend!</h2>
        <p style={{ textAlign: "center" }}>
          Don't have an account. Don't worry just type your email <br /> and
          start your journey with Eventhut
        </p>
      </div>
      <style jsx>
        {`
          .login {
            display: flex;
            height: 100vh;
          }

          .login__left {
            width: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .login__right {
            width: 40%;
            background-image: url("https://images.unsplash.com/photo-1557787824-93666b9f6093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80");
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .login__right > h2 {
            color: white;
            font-size: 3rem;
            font-weight: 500;
            margin: 0.5rem 0;
            -webkit-box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
            -moz-box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
            box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
          }

          .login__right > p {
            color: white;
            margin: 0.5rem 0;
            -webkit-box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
            -moz-box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
            box-shadow: 0px 0px 14px 0px rgba(49, 50, 50, 0.38);
          }

          .login__signupbtn {
            background-color: var(--secondary-color);
            width: 150px;
            display: flex;
            margin: 1rem 0;
            color: white;
            font-weight: 600;
            border-radius: 0.5rem;
            align-items: center;
            justify-content: center;
            height: 55px;
            text-decoration: none;
          }

          .login__signupbtn:hover {
            background-color: var(--primary-color);
          }

          .login__brand > img {
            height: 50px;
            margin: 2rem 0;
          }

          .login__content {
            margin-top: 15vh;
            text-align: center;
          }

          .login__content > h3 {
            font-size: 2.5rem;
            font-weight: 600;
            margin: 1rem 0;
            color: var(--text-color);
          }

          .login__form {
            width: 600px;
          }

          .login__item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .login__item > span {
            margin: 1rem 0;
            font-weight: 500;
            color: var(--text-color);
            text-transform: uppercase;
          }

          .login__item > input {
            width: 100%;
            padding: 1rem 0.5rem;
            font-size: 1rem;
            border-radius: 5px;
            background-color: var(--white-color);
            border: 1px solid var(--secondary-color);
            color: var(--text-color);
          }

          .login__item > input::placeholder {
            color: var(--secondary-color);
          }

          .login__item > input:focus {
            border: 2px solid var(--primary-color);
          }

          .login__button {
            background-color: var(--primary-color);
            width: 150px;
            display: flex;
            margin: 2rem auto 1rem;
            color: white;
            font-weight: 600;
            border-radius: 0.5rem;
            align-items: center;
            justify-content: center;
            outline: none;
            height: 55px;
            text-decoration: none;
            border: none;
            font-size: 1rem;
            cursor: pointer;
          }

          .login__button:hover {
            background-color: var(--secondary-color);
          }

          @media (max-width: 1100px) {
            .login {
              flex-direction: column;
              height: max-content;
            }

            .login__left {
              width: 100%;
              height: 100vh;
            }

            .login__right {
              width: 100%;
              height: 50vh;
              padding: 0 1rem;
              text-align: center;
            }

            .login__form {
              width: 100%;
            }

            .login__content > h3 {
              font-size: 2rem;
            }

            .login__button {
              width: 100%;
            }
            .login__content {
              margin-top: 5rem;
              width: 80%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
