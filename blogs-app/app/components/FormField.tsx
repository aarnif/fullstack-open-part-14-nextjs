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
  <label className="flex flex-col">
    {formatLabel(name)}
    <input
      className="rounded p-2 dark:bg-slate-800 bg-slate-200 text-slate-700 dark:text-white placeholder:text-slate-500"
      type={type}
      name={name}
      defaultValue={defaultValue}
      {...(type === "number" && { min: "0" })}
      required
    />
  </label>
);

export default FormField;
