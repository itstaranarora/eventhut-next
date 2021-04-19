import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
        const data = res.json();
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
      <h2>{booking ? "Success" : "Not Success"}</h2>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go to dashboard
      </button>
    </div>
  );
}
