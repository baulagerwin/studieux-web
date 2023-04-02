interface Props {
  type?: string;
  label: string;
  placeholder: string;
  autoFocus: boolean;
  name: string;
  field: {
    value: string;
    error: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: boolean;
}

function Input({
  type = "text",
  label,
  placeholder,
  autoFocus,
  name,
  field,
  onChange,
  max = false,
}: Props) {
  return (
    <label
      className={`input ${max && "grid-span-max"} ${
        field.error && "u__animation--shake u__text-error--color"
      }`}
    >
      {!field.error ? label : field.error + "*"}
      <input
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        name={name}
        className={`${field.error && "u__input-error--border"}`}
        value={field.value}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
