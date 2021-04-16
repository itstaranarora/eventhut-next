import AdminLayout from "components/AdminLayout";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";

export default function CreateEvent() {
  const { user } = useAuth();
  const router = useRouter();

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
      <Typography variant="h3" align="center">
        Under Development
      </Typography>
    </AdminLayout>
  );
}
