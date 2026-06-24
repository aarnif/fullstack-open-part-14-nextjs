import { HTMLInputTypeAttribute } from "react";
import { createBlog } from "@/app/actions/blogs";

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const FormField = ({
  type,
  name,
}: {
  type: HTMLInputTypeAttribute;
  name: string;
}) => (
  <div>
    <label>
      {capitalize(name)}
      <input
        type={type}
        name={name}
        {...(type === "number" && { min: "0" })}
        required
      />
    </label>
  </div>
);

const NewBlog = () => (
  <div>
    <h2>Create a new blog</h2>
    <form action={createBlog}>
      <FormField type="text" name="title" />
      <FormField type="text" name="author" />
      <FormField type="text" name="url" />
      <FormField type="number" name="likes" />
      <button type="submit">Create</button>
    </form>
  </div>
);

export default NewBlog;
