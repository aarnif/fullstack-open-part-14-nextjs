import { registerUser } from "../actions/users";
import FormField from "../components/FormField";

const RegisterPage = () => (
  <div>
    <h2>Register</h2>
    <form action={registerUser}>
      <FormField type="text" name="username" />
      <FormField type="text" name="name" />
      <FormField type="password" name="password" />
      <button type="submit">Register</button>
    </form>
  </div>
);

export default RegisterPage;
