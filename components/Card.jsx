import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import { format } from "date-fns";
import { twoDecimals } from "utils/format";

function Card({ data }) {
  const router = useRouter();
  const handleClick = (slug) => {
    router.push("/event/" + slug);
  };

  return (
    <div onClick={() => handleClick(data?.slug)} className="card">
      <div className="card__head">
        <div className="card__icons">
          <IconButton className="card__icon">
            <span>
              {data?.price === 0 ? "Free" : `₹${twoDecimals(data?.price)}`}
            </span>
          </IconButton>
          <IconButton className="card__icon">
            {data?.isOnline ? <CloudQueueIcon /> : <CloudOffIcon />}
          </IconButton>
        </div>
        <img className="card_img" src={data.imgURL} alt={data.imgURL} />
      </div>
      <div className="card__body">
        <div className="card__date">
          <span>{format(new Date(data?.datetime), "EEE")}</span>
          <h3>{format(new Date(data?.datetime), "dd")}</h3>
        </div>
        <div className="card__info">
          <h3>{data.name}</h3>
          <p>
            {data.address.location}
            <br />
            {data.address.city}, {data.address.state}, {data.address.country}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            width: 100%;
            cursor: pointer;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          }

          .card:hover {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }

          .card__head {
            overflow: hidden;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            height: 220px;
            width: 100%;
            position: relative;
          }

          .card_img {
            width: 100%;
          }

          .card__body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            background-color: var(--white-color);
          }

          .card__date {
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .card__date > span {
            text-transform: capitalize;
            color: var(--primary-color);
          }

          .card__date > h3 {
            font-size: 1.6rem;
            margin: 0.5rem;
            color: var(--text-color);
          }

          .card__info {
            width: 80%;
            display: flex;
            flex-direction: column;
          }

          .card__info > h3 {
            color: var(--text-color);
            font-weight: 500;
            margin: 0;
          }

          .card__info > p {
            margin: 1rem 0;
            color: var(--secondary-color);
          }

          @media (max-width: 600px) {
            .card {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Card;
