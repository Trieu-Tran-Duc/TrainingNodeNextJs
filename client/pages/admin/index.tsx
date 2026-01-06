import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/login");
    }
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
