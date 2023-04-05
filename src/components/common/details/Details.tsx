import IQNA from "../../qnas/model/IQNA";

interface Props {
  count: number;
  filterBy: string;
}

function Details({ count, filterBy }: Props) {
  return (
    <>
      <p className="details--desktop">{`There are ${count} questions and answer in ${filterBy.toLowerCase()}`}</p>
      <p className="details--mobile">{`Questions(${count})`}</p>
    </>
  );
}

export default Details;
