interface Props {
  label: string;
  onClose: () => void;
}

function FormHeader({ label, onClose }: Props) {
  return (
    <div className="form-header">
      <h4>{label}</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onClick={onClose}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export default FormHeader;
