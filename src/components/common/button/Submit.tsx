import { Oval } from "react-loader-spinner";

function Submit({ text, isLoading }: { text: string; isLoading: boolean }) {
  return (
    <button className="btn btn--full grid-span-max" type="submit">
      {!isLoading ? (
        text
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
  );
}

export default Submit;
