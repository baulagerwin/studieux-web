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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  max?: boolean;
}

function TextArea({
  label,
  placeholder,
  autoFocus,
  name,
  field,
  onChange,
  onKeyDown,
  max = false,
}: Props) {
  return (
    <label
      className={`text-area ${max && "grid-span-max"} ${
        field.error && "u__animation--shake u__text-error--color"
      }`}
    >
      {!field.error ? label : field.error + "*"}
      <textarea
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        name={name}
        className={`${field.error && "u__input-error--border"}`}
        value={field.value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </label>
  );
}

export default TextArea;
