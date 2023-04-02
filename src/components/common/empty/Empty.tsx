import emptyShelve from "../../../assets/empty.png";

interface Props {
  item: string;
}

function Empty({ item }: Props) {
  return (
    <div className="empty">
      <div className="empty__box">
        <img src={emptyShelve} alt="Empty Shelve" />
      </div>
      <h3>Empty list!</h3>
      <p>{`You have no ${item} at this moment.`}</p>
      <p>Try creating one.</p>
    </div>
  );
}

export default Empty;
