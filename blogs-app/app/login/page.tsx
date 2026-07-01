"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "@/app/components/FormField";
import Button from "@/app/components/Button";
import { useNotification } from "../components/NotificationContext";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("login successful");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && (
        <p style={{ color: "red" }} data-testid="error-message">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="max-w-100 flex flex-col gap-4">
        <FormField
          type="text"
          name="username"
          placeholder="Enter your username"
        />
        <FormField
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <Button type="submit" data-testid="login-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
