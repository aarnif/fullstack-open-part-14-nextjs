"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/actions/users";
import FormField from "@/app/components/FormField";

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "", password: "", passwordConfirm: "" },
  });

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
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
          name="password-confirm"
          defaultValue={state.values.passwordConfirm}
          placeholder="Confirm your password"
        />
        <button type="submit">Register</button>
        {Object.keys(state.errors).length > 0 && (
          <>
            {Object.entries(state.errors).map(([field, error]) => (
              <p key={field} style={{ color: "red" }}>
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
