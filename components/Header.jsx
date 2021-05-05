import Link from "next/link";
import { useContext } from "react";
import { useAuth } from "context/AuthContext";

function Header() {
  const { user } = useAuth();
  return (
    <header className="header container ">
      <Link href="/">
        <a className="header__brand">
          <img src="/Logo.svg" className="header__logo" alt="eventhut logo" />
        </a>
      </Link>
      <div className="header__items">
        {user ? (
          <Link href="/dashboard">
            <a> Dashboard </a>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <a> Login </a>
            </Link>
            {/* <Link href="/signup">
              <a> Sign Up </a>
            </Link> */}
          </>
        )}
      </div>
      <style jsx>
        {`
          .header {
            display: flex;
            align-items: center;
            padding: 2rem 0;
            justify-content: space-between;
          }

          .header__logo {
            height: 50px;
          }

          .header__items {
            display: flex;
          }

          .header__items > a {
            text-decoration: none;
            margin: 0 0.5rem;
            width: 150px;
            height: 60px;
            border-radius: 1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-color);
          }

          .header__items > a:last-child {
            background-color: var(--light-gray);
            color: var(--dark-blue);
          }

          .header__items > a:last-child:hover {
            background-color: var(--primary-color);
            color: white;
          }

          .header__items > a:hover {
            background-color: var(--light-gray);
          }

          .header__hover > a:hover {
            color: #333333 !important;
          }

          @media (max-width: 600px) {
            .header__logo {
              height: 35px;
            }
            .header__items > a {
              width: 100px;
              margin: 0.1rem;
              font-size: 14px;
            }
            .header {
              padding: 1rem 0.5rem;
            }
          }
        `}
      </style>
    </header>
  );
}

export default Header;
