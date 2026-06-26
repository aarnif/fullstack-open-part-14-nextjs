import { HTMLInputTypeAttribute } from "react";

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const formatLabel = (name: string) => {
  const separator = "-";
  if (name.includes(separator)) {
    return name.split(separator).map(capitalize).join(" ");
  }
  return capitalize(name);
};

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
      {formatLabel(name)}
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
