import AdminLayout from "components/AdminLayout";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { API_URL } from "utils/urls";
import { createRef } from "react";

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
              slug: order.event.slug,
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

  return { orders, setOrders };
};

const Admin = ({ events }) => {
  const { user, getToken } = useAuth();
  const router = useRouter();
  const tableRef = createRef();

  const { orders, setOrders } = useBooking(user, getToken);

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

  async function handleDeleteEvent(id) {
    const token = await getToken();

    fetch(`${API_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Your booking is cancelled. For refund you can reach us");
      });
  }

  return (
    <AdminLayout>
      <MaterialTable
        title="Your Events"
        tableRef={tableRef}
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
            icon: "launch",
            tooltip: "View Event",
            onClick: (event, rowData) => router.push(`/event/${rowData.slug}`),
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...orders];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setOrders([...dataDelete]);
                handleDeleteEvent(oldData.id);
                resolve();
              }, 1000);
            }),
        }}
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
