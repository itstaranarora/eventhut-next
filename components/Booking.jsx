import { format } from "date-fns";
import { twoDecimals } from "utils/format";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";
import Popover from "@material-ui/core/Popover";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "utils/urls";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import parseWithOptions from "date-fns/fp/parseWithOptions/index.js";

const stripePromise = loadStripe(STRIPE_PK);

function Booking({ data }) {
  const { user, getToken } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleBook = async () => {
    const stripe = await stripePromise;
    const token = await getToken();

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      body: JSON.stringify({ event: { id: data.id } }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const redirectToLogin = () => router.push("/login");

  let path;

  if (typeof window !== "undefined") {
    path = window.location.href;
  }

  return (
    <div className="booking">
      <div className="booking__info">
        <h3>Date & Time</h3>
        <span>
          {data &&
            format(new Date(data?.datetime), "EEEE, LLL dd yyyy 'at' hh: mm a")}
        </span>
        <p>{data?.price === 0 ? "Free" : `₹ ${twoDecimals(data?.price)}`}</p>
      </div>
      {!user && (
        <button onClick={redirectToLogin} className="booking_btnbook">
          Login to Book
        </button>
      )}
      {user && (
        <button onClick={handleBook} className="booking_btnbook">
          Book Now
        </button>
      )}
      <button onClick={handleClick} className="booking_btnshare">
        Promote Program
      </button>
      <span>No Refunds</span>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ padding: "0.5rem 1rem" }}>
          <h4 style={{ textAlign: "center", margin: "0.5rem 0" }}>
            Share with your Friends
          </h4>
          <div className="popover">
            <FacebookShareButton url={path}>
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <WhatsappShareButton style={{ margin: "0 10px" }} url={path}>
              <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <TwitterShareButton url={path}>
              <TwitterIcon size={50} round />
            </TwitterShareButton>
            <LinkedinShareButton style={{ marginLeft: 10 }} url={path}>
              <LinkedinIcon size={50} round />
            </LinkedinShareButton>
          </div>
        </div>
      </Popover>
      <style jsx>
        {`
          .booking {
            width: 380px;
            background-color: var(--bg-color);
            padding: 2rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            text-align: center;
          }

          .popover {
            display: flex;
            justify-content: space-between;
          }

          .booking__info {
            text-align: start;
            margin-bottom: 20px;
          }

          .booking__info > h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-color);
          }

          .booking__info > span {
            color: var(--secondary-color);
          }

          .booking__info > p {
            color: var(--text-color);
            font-weight: 600;
            font-size: 1.6rem;
            margin-top: 10px;
          }

          .booking_btnbook {
            background-color: var(--primary-color);
            padding: 1rem 0;
            color: white;
            font-size: 1rem;
            border-radius: 0.6rem;
            cursor: pointer;
            border: none;
            font-weight: 600;
          }

          .booking_btnshare {
            background-color: var(--light-gray);
            padding: 1rem 0;
            color: var(--text-color);
            font-size: 1rem;
            border-radius: 0.6rem;
            margin: 1rem 0;
            cursor: pointer;
            border: none;
            font-weight: 400;
          }

          .booking_btnbook:hover {
            background-color: var(--secondary-color);
          }

          .booking_btnshare:hover {
            background-color: var(--secondary-color);
          }

          .booking > span {
            color: var(--secondary-color);
          }

          @media (max-width: 1100px) {
            .booking {
              width: 100%;
              box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Booking;
