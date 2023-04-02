import { useEffect, useRef, useState } from "react";
import IQNA from "../../qnas/model/IQNA";
import SlideshowItem from "./SlideshowItem";

interface Props {
  item: {
    topic: string;
    qnas: IQNA[];
  };
  onActivePopUp: (value: string) => void;
  onChangeQna: (qna: IQNA) => void;
  onChangeQnas: (qnas: IQNA[]) => void;
}

function Slideshow({ item, onActivePopUp, onChangeQna, onChangeQnas }: Props) {
  const itemRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    if (!itemRef.current) return;

    itemRef.current.scroll(position, 0);
  }, [position]);

  function handleOnMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.nativeEvent.pageX + position);
  }

  function handleOnMouseMove(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isDown) return;
    if (!itemRef.current) return;

    let maxScrollX = itemRef.current.scrollWidth - itemRef.current.clientWidth;
    let offsetX = e.nativeEvent.pageX;
    let diff = startX - offsetX;
    let scrollX = diff;

    if (scrollX < 0) {
      setPosition(0);
      return;
    }

    if (scrollX >= maxScrollX) {
      setPosition(maxScrollX);
      return;
    }

    setPosition(scrollX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

  function handleOnMouseLeave(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.touches[0].clientX + position);
  }

  function handleOnTouchMove(e: React.TouchEvent) {
    if (!isDown) return;
    if (!itemRef.current) return;

    let maxScrollX = itemRef.current.scrollWidth - itemRef.current.clientWidth;
    let offsetX = e.touches[0].clientX;
    let diff = startX - offsetX;
    let scrollX = diff;

    if (scrollX < 0) {
      setPosition(0);
      return;
    }

    if (scrollX >= maxScrollX) {
      setPosition(maxScrollX);
      return;
    }

    setPosition(scrollX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

  return (
    <div className="slideshow">
      <div className="slideshow__header u__margin--right">
        <h3>{item.topic}</h3>
        {item.qnas.length > 4 && (
          <button
            type="button"
            className="btn btn--start"
            onClick={() => {
              onActivePopUp("cards");
              onChangeQnas(item.qnas);
            }}
          >
            <span>Start</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        ref={itemRef}
        className="slideshow__window"
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUp}
        onMouseLeave={handleOnMouseLeave}
        onTouchStart={handleOnTouchStart}
        onTouchMove={handleOnTouchMove}
        onTouchEnd={handleOnTouchEnd}
      >
        {Boolean(item.qnas.length) && (
          <ul className="slideshow__list u__margin--right">
            {item.qnas.map((qna) => (
              <SlideshowItem
                key={qna._id}
                qna={qna}
                onActivePopUp={onActivePopUp}
                onChangeQna={onChangeQna}
              />
            ))}
          </ul>
        )}
        {!Boolean(item.qnas.length) && (
          <div className="u__margin--right">
            <div className="slideshow__empty">
              It's empty. Try to create one.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Slideshow;
