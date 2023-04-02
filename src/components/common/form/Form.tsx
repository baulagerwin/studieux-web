interface Props {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

function Form({ children, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
}

export default Form;
