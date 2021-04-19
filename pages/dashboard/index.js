import AdminLayout from "components/AdminLayout";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { API_URL } from "utils/urls";

const useBooking = (user, getToken) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/bookings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          const filterData = data?.filter((item) => item.status === "paid");
          const result = filterData?.map((order) => {
            return {
              name: order.event.name,
              id: order._id,
              mode: order.event.isOnline,
              datetime: order.event.datetime,
              total: order.total,
            };
          });

          setOrders(result);
        } catch (err) {
          setOrders([]);
        }
      }
    };

    fetchOrders();
  }, [user]);

  return orders;
};

const Admin = ({ events }) => {
  const { user, getToken } = useAuth();
  const router = useRouter();

  const orders = useBooking(user, getToken);

  getToken().then((res) => console.log(res));

  if (!user) {
    return (
      <div className="event__loading">
        <img src="/LogoSmall.svg" alt="logo" />
      </div>
    );
  }

  setTimeout(() => {
    if (!user) router.push("/");
  }, 10000);

  return (
    <AdminLayout>
      <MaterialTable
        title="Your Events"
        columns={[
          { title: "Name", field: "name" },
          {
            title: "Mode",
            field: "mode",
            lookup: { true: "Online", false: "Offline" },
          },
          { title: "Date & Time", field: "datetime", type: "datetime" },
          {
            title: "Total",
            field: "total",
            type: "currency",
            currencySetting: {
              currencyCode: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            },
          },
        ]}
        data={orders}
        actions={[
          {
            icon: "cancel",
            tooltip: "Cancel Event",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
        ]}
      />
    </AdminLayout>
  );
};

export default Admin;

export async function getStaticProps() {
  const events_res = await fetch(`${API_URL}/events`);
  const events = await events_res.json();

  return {
    props: {
      events: events,
    },
  };
}
