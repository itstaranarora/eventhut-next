import { useState } from "react";
import Link from "next/link";
import { CircularProgress } from "@material-ui/core";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="signup">
      <div className="signup__left">
        <h2>Welcome Back!</h2>
        <p>
          To keep connected with us please login with <br /> your personal info
        </p>
        <Link href="/login">
          <a className="signup__signupbtn">Sign In</a>
        </Link>
      </div>
      <div className="signup__right">
        <Link href="/">
          <a className="signup__brand">
            <img src="/Logo.svg" className="signup__logo" alt="eventhut logo" />
          </a>
        </Link>
        <div className="signup__content">
          <h3>Create Account</h3>
          <form className="signup__form">
            <div className="signup__item">
              <span>Your Username</span>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Taran Arora"
              />
            </div>
            <div className="signup__item">
              <span>Your Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="itstaranarora@gmail.com"
              />
            </div>
            <div className="signup__item">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
              />
            </div>
            <button onClick={handleSubmit} className="signup__button">
              {loading ? <CircularProgress color="#fff" /> : "Sign Up"}
            </button>
          </form>
          <style>
            {`
                .signup {
                    display: flex;
                    height: 100vh;
                  }
                  
                  .signup__right {
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  
                  .signup__left {
                    width: 40%;
                    background-image: url("https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
                    background-size: cover;
                    background-position: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }
                  
                  .signup__left > h2 {
                    color: white;
                    font-size: 3rem;
                    font-weight: 500;
                    margin: 0.5rem 0;
                  }
                  
                  .signup__left > p {
                    color: white;
                    margin: 0.5rem 0;
                  }
                  
                  .signup__signupbtn {
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
                  
                  .signup__signupbtn:hover {
                    background-color: var(--primary-color);
                  }
                  
                  .signup__brand > img {
                    height: 50px;
                    margin: 2rem 0;
                  }
                  
                  .signup__content {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 10vh;
                    text-align: center;
                  }
                  
                  .signup__content > h3 {
                    font-size: 2.5rem;
                    font-weight: 600;
                    margin: 1rem 0;
                    color: var(--text-color);
                  }
                  
                  .signup__form {
                    width: 600px;
                  }
                  
                  .signup__item {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                  }
                  
                  .signup__item > span {
                    margin: 1rem 0;
                    font-weight: 500;
                    color: var(--text-color);
                    text-transform: uppercase;
                  }
                  
                  .signup__item > input {
                    width: 100%;
                    padding: 1rem 0.5rem;
                    font-size: 1rem;
                    border-radius: 5px;
                    background-color: var(--white-color);
                    border: 1px solid var(--secondary-color);
                    color: var(--text-color);
                  }
                  
                  .signup__item > input::placeholder {
                    color: var(--secondary-color);
                  }
                  
                  .signup__item > input:focus {
                    border: 2px solid var(--primary-color);
                  }
                  
                  .signup__button {
                    background-color: var(--primary-color);
                    width: 150px;
                    display: flex;
                    margin: 2rem auto 1rem;
                    color: white;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    align-items: center;
                    justify-content: center;
                    height: 55px;
                    text-decoration: none;
                    border: none;
                    font-size: 1rem;
                    outline: none;
                    cursor: pointer;
                  }
                  
                  .signup__button:hover {
                    background-color: var(--secondary-color);
                  }
                  
                  @media (max-width: 1100px) {
                    .signup {
                      flex-direction: column-reverse;
                      height: max-content;
                    }
                  
                    .signup__right {
                      width: 100%;
                      height: 100vh;
                    }
                  
                    .signup__left {
                      width: 100%;
                      height: 50vh;
                      padding: 0 1rem;
                      text-align: center;
                    }
                  
                    .signup__form {
                      width: 100%;
                    }
                  
                    .signup__content > h3 {
                      font-size: 2rem;
                    }
                  
                    .signup__button {
                      width: 100%;
                    }
                    .signup__content {
                      margin-top: 5rem;
                      width: 80%;
                    }
                  }
                  
                `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default Signup;
