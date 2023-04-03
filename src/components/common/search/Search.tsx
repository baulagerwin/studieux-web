import { Oval } from "react-loader-spinner";

interface Props {
  field: string;
  cN?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

function Search({ field, cN = "", onChange, isLoading }: Props) {
  return (
    <div className={`search ${cN}`}>
      <input
        type="text"
        placeholder="Search"
        autoComplete="off"
        value={field}
        onChange={onChange}
      />
      {isLoading ? (
        <Oval
          height={14}
          width={14}
          color="#453c67"
          visible={true}
          ariaLabel="oval-loading"
          wrapperClass="search__oval"
          secondaryColor="#cec9ec"
          strokeWidth={8}
          strokeWidthSecondary={8}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className=""
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      )}
    </div>
  );
}

export default Search;
