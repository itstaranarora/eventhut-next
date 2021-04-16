import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Filter() {
  return (
    <div className="filter container">
      <div className="filter__items">
        <div className="filter__item">
          <p>Looking for</p>
          <input type="text" placeholder="Music Concert" />
        </div>
        <div className="filter__item">
          <p>In</p>
          <input type="text" placeholder="Ludhiana" />
        </div>
        <div className="filter__item">
          <p>When</p>
          <input type="text" placeholder="Weekend" />
        </div>
      </div>
      <div className="filter__button">
        <IconButton className="filter__iconBtn">
          <SearchIcon className="filter__btn" />
        </IconButton>
      </div>
      <style jsx>
        {`
          .filter {
            display: flex;
            background-color: var(--dark-blue);
            border-radius: 1rem;
            height: 130px;
            margin-top: -5rem;
          }

          .filter__items {
            display: flex;
            justify-content: space-between;
            width: 90%;
          }

          .filter__item {
            width: 33%;
            display: flex;
            flex-direction: column;
            padding: 1rem 2rem;
          }

          .filter__item:nth-child(2) {
            border-right: 1px solid var(--secondary-color);
            border-left: 1px solid var(--secondary-color);
          }

          .filter__item > p {
            color: white;
            margin: 0.5rem 0;
            font-weight: 500;
          }

          .filter__item > input {
            background-color: var(--dark-blue);
            height: 50px;
            color: white;
            font-size: 1.5rem;
            border: none;
            border-bottom: 2px solid var(--primary-color);
          }

          .filter__button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10%;
          }

          @media screen and (max-width: 600px) {
            .filter {
              flex-direction: column;
              height: 55vh;
              margin-top: -1.5rem;
              height: max-content;
              padding: 1.2rem;
            }
            .filter__items {
              flex-direction: column;
              width: 100%;
            }
            .filter__item:nth-child(2) {
              border: none;
            }

            .filter__item {
              width: 100%;
              padding: 0;
              margin: 10px 0;
            }
            .filter__button {
              width: 100%;
              margin-top: 1.2rem;
            }
          }
        `}
      </style>
    </div>
  );
}
