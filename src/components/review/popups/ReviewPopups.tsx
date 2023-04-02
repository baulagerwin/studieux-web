import FlippableCard from "../../common/flippableCard/FlippableCard";
import IQNA from "../../qnas/model/IQNA";
import Deck from "../../common/deck/Deck";

interface Props {
  activePopUp: string;
  card: IQNA;
  cards: IQNA[];
  onClose: () => void;
}

function ReviewPopups({ activePopUp, card, cards, onClose }: Props) {
  return (
    <>
      {activePopUp === "card" && (
        <div className="review__popup" onClick={onClose}>
          <FlippableCard qna={card} />
        </div>
      )}
      {activePopUp === "cards" && (
        <div className="review__popup" onMouseDown={onClose}>
          <Deck qnas={cards} />
        </div>
      )}
    </>
  );
}

export default ReviewPopups;
