"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/actions/blogs";
import FormField from "@/app/components/FormField";
import { useNotification } from "@/app/components/NotificationContext";
import Button from "@/app/components/Button";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    success: false,
    errors: {},
    values: { title: "", author: "", url: "", likes: "0" },
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="max-w-100 flex flex-col gap-4">
        <FormField
          type="text"
          name="title"
          defaultValue={state.values.title}
          placeholder="Blog title"
        />
        <FormField
          type="text"
          name="author"
          defaultValue={state.values.author}
          placeholder="Author name"
        />
        <FormField
          type="text"
          name="url"
          defaultValue={state.values.url}
          placeholder="Blog URL"
        />
        <FormField
          type="number"
          name="likes"
          defaultValue={state.values.likes}
          placeholder="Number of likes"
        />
        <Button type="submit">Create</Button>
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
