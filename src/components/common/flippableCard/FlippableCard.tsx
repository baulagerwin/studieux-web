import { useRef, useState } from "react";
import IQNA from "../../../models/IQNA";

interface Props {
  qna: IQNA;
}

function FlippableCard({ qna }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [end, setEnd] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  function handleOnMouseDown(e: React.MouseEvent) {
    e.stopPropagation();

    setStart({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    if (start.x !== e.nativeEvent.pageX && start.y !== e.nativeEvent.pageY)
      return;

    cardRef.current?.classList.toggle("u__rotate--180");
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    setStart({
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
    });
  }

  function handleOnTouchMove(e: React.TouchEvent) {
    setEnd({
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
    });
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    if (start.x !== end.x && start.y !== end.y) return;

    cardRef.current?.classList.toggle("u__rotate--180");
    setStart({
      x: 0,
      y: 0,
    });
    setEnd({
      x: 0,
      y: 0,
    });
  }

  return (
    <div
      className="flippable-card"
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchMove={handleOnTouchMove}
      onTouchEnd={handleOnTouchEnd}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flippable-card__window" ref={cardRef}>
        <div className="flippable-card__front">
          <p className="flippable-card__question">{qna.question}</p>
        </div>
        <div className="flippable-card__back">
          <p className="flippable-card__answer">{qna.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FlippableCard;
