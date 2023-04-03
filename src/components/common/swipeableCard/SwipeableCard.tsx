import { useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import IQNA from "../../qnas/model/IQNA";

interface Props {
  qna: IQNA;
  windowWidth: number;
}

function SwipeableCard({ qna, windowWidth }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);

  let startX: number;
  let startY: number;

  let endX: number;
  let endY: number;

  function onMouseDown(e: React.MouseEvent) {
    e.stopPropagation();

    startX = e.nativeEvent.pageX;
    startY = e.nativeEvent.pageY;
    setIsDown(true);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDown) return;
    endX = e.nativeEvent.pageX;
    endY = e.nativeEvent.pageY;
  }

  function onMouseUp(e: React.MouseEvent) {
    if (!endX && !endY) cardRef.current?.classList.toggle("u__rotate--180");

    startX = 0;
    startY = 0;

    endX = 0;
    endY = 0;

    setIsDown(false);
  }

  function onTouchStart(e: React.TouchEvent) {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  }

  function onTouchMove(e: React.TouchEvent) {
    endX = e.touches[0].pageX;
    endY = e.touches[0].pageY;
  }

  function onTouchEnd() {
    if (!endX && !endY) cardRef.current?.classList.toggle("u__rotate--180");

    startX = 0;
    startY = 0;

    endX = 0;
    endY = 0;
  }

  return (
    <TinderCard
      className="u__position--absolute"
      swipeRequirementType={windowWidth > 768 ? "position" : "velocity"}
      swipeThreshold={windowWidth > 768 ? 300 : 0.5}
    >
      <div className="swipeable-card">
        <div
          ref={cardRef}
          className={`swipeable-card__window`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="swipeable-card__front">
            <p className="swipeable-card__question">{qna.question}</p>
          </div>
          <div className="swipeable-card__back">
            <p className="swipeable-card__answer">{qna.answer}</p>
          </div>
        </div>
      </div>
    </TinderCard>
  );
}

export default SwipeableCard;
