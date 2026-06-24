import { HTMLInputTypeAttribute } from "react";

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

export default FormField;
