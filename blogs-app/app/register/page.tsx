"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/actions/users";
import FormField from "@/app/components/FormField";
import Button from "@/app/components/Button";

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "", password: "", passwordConfirm: "" },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="max-w-100 flex flex-col gap-4">
        <FormField
          type="text"
          name="username"
          defaultValue={state.values.username}
          placeholder="Choose a username"
        />
        <FormField
          type="text"
          name="name"
          defaultValue={state.values.name}
          placeholder="Enter your full name"
        />
        <FormField
          type="password"
          name="password"
          defaultValue={state.values.password}
          placeholder="Choose a password"
        />
        <FormField
          type="password"
          name="confirm-password"
          defaultValue={state.values.passwordConfirm}
          placeholder="Confirm your password"
        />
        <Button type="submit" data-testid="register-button">
          Register
        </Button>
        {Object.keys(state.errors).length > 0 && (
          <>
            {Object.entries(state.errors).map(([field, error]) => (
              <p
                key={field}
                style={{ color: "red" }}
                data-testid={`${field}-error`}
              >
                {error}
              </p>
            ))}
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
