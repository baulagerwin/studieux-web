import { useState } from "react";
import IQNA from "../../../models/IQNA";

interface Props {
  qna: IQNA;
  onActivePopUp: (value: string) => void;
  onChangeQna: (value: IQNA) => void;
}

function SlideshowItem({ qna, onActivePopUp, onChangeQna }: Props) {
  const [startX, setStartX] = useState(0);

  function handleOnMouseDown(e: React.MouseEvent) {
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    if (startX !== e.nativeEvent.pageX) return;
    // navigator(`/review/qnas/${qna._id}`);
    // open the card
    onActivePopUp("card");
    onChangeQna(qna);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0]?.clientX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    if (startX !== e.touches[0]?.clientX) return;
    // navigator(`/review/qnas/${qna._id}`);
    // open the card
    onActivePopUp("card");
    onChangeQna(qna);
  }

  return (
    <li
      className="slideshow__item"
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
    >
      {qna.question}
    </li>
  );
}

export default SlideshowItem;
