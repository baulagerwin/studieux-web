import { Oval } from "react-loader-spinner";
import Form from "../form/Form";

interface Props {
  value: string;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isLoading: boolean;
}

function Confirmation({ value, onSubmit, onClose, isLoading }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <p className="confirmation__message">
        Are you sure you want to delete this:
      </p>
      <p className="confirmation__value">{value}</p>
      <div className="confirmation__buttons">
        <button type="button" className="btn btn--cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn--delete-confirmation">
          {!isLoading ? (
            "Yes, delete this"
          ) : (
            <Oval
              height={14}
              width={14}
              color="#fff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f4f4f4"
              strokeWidth={10}
              strokeWidthSecondary={10}
            />
          )}
        </button>
      </div>
    </Form>
  );
}

export default Confirmation;
