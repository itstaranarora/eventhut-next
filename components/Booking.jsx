import { format } from "date-fns";
import { twoDecimals } from "utils/format";

function Booking({ data }) {
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
      <button className="booking_btnbook">Book Now</button>
      <button className="booking_btnshare">Promote Program</button>
      <span>No Refunds</span>
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
