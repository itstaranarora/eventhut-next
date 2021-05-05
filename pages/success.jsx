import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { API_URL } from "utils/urls";

const useBooking = (session_id) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/bookings/confirm`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ checkout_session: session_id }),
        });
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setBooking(null);
      }
      setLoading(false);
    };
    fetchBooking();
  }, []);

  return { booking, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  const { booking, loading } = useBooking(session_id);

  return (
    <div>
      <Head>
        <title>Thank you for your purchase</title>
      </Head>
      <div className="max">
        <img src="/Logo.svg" alt="logo" />
        <p>Booking Ref: {booking?.checkout_session}</p>
        <h1>You successfully created your reservation</h1>
        <Link href="/dashboard">
          <a>Go Back to Homepage</a>
        </Link>
      </div>

      <style jsx>{`
        .max {
          display: flex;
          height: 100vh;
          background: #fff;
          flex-direction: column;
          align-items: center;
        }

        img {
          margin-top: 8rem;
          margin-bottom: 4rem;
        }

        p {
          font-size: 1.2rem;
        }

        h1 {
          font-size: 3rem;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}
