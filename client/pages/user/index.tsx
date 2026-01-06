import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      router.replace("/login");
    }
  }, []);

  return (
    <div>
      <h1>User Page</h1>
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
