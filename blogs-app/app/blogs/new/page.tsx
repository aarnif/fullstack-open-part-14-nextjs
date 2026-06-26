"use client";

import { useActionState } from "react";
import { createBlog } from "@/app/actions/blogs";
import FormField from "@/app/components/FormField";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { errors: {} });

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <FormField type="text" name="title" />
        <FormField type="text" name="author" />
        <FormField type="text" name="url" />
        <FormField type="number" name="likes" />
        <button type="submit">Create</button>
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

export default NewBlog;
