import { createBlog } from "@/app/actions/blogs";
import FormField from "@/app/components/FormField";

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
