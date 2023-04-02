import { shuffle } from "lodash";
import SwipeableCard from "../swipeableCard/SwipeableCard";
import IQNA from "../../qnas/model/IQNA";

interface Props {
  qnas: IQNA[];
}

function Deck({ qnas }: Props) {
  let shuffled = shuffle(qnas);

  return (
    <div className="deck">
      {shuffled.map((qna) => (
        <SwipeableCard key={qna._id} qna={qna} />
      ))}
    </div>
  );
}

export default Deck;
