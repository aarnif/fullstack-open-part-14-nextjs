import { HTMLInputTypeAttribute } from "react";

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const FormField = ({
  type,
  name,
  defaultValue,
}: {
  type: HTMLInputTypeAttribute;
  name: string;
  defaultValue?: string;
}) => (
  <div>
    <label>
      {capitalize(name)}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        {...(type === "number" && { min: "0" })}
        required
      />
    </label>
  </div>
);

export default FormField;
