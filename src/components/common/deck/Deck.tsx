import { shuffle } from "lodash";
import SwipeableCard from "../swipeableCard/SwipeableCard";
import IQNA from "../../qnas/model/IQNA";
import { useEffect, useState } from "react";

interface Props {
  qnas: IQNA[];
}

function Deck({ qnas }: Props) {
  let shuffled = shuffle(qnas);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="deck">
      {shuffled.map((qna) => (
        <SwipeableCard key={qna._id} qna={qna} windowWidth={windowWidth} />
      ))}
    </div>
  );
}

export default Deck;
