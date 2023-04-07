import { useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import ITopic from "../../../models/ITopic";

interface Props<
  T extends { _id: string; topic: ITopic; question: string; answer: string }
> {
  item: T;
  items: T[];
  onSwipeRight: (item: T) => void;
  onSwipeLeft: (item: T) => void;
}

function AccordionItem<
  T extends { _id: string; topic: ITopic; question: string; answer: string }
>({ item, items, onSwipeRight, onSwipeLeft }: Props<T>) {
  const itemRef = useRef<HTMLLIElement>(null);
  const sideButtonRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [positionDiff, setPositionDiff] = useState<number>(0);

  useEffect(() => {
    if (isOpen) return;
    if (!itemRef.current || !sideButtonRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;
    let scrollX = sideButtonWidth - positionDiff;

    itemRef.current.scroll(scrollX, 0);
  }, [positionDiff, items]);

  function handleOnMouseDown(e: React.MouseEvent) {
    e.stopPropagation();

    setIsDown(true);
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseMove(e: React.MouseEvent) {
    e.stopPropagation();

    let offsetX = e.nativeEvent.pageX;
    let swiped = isDown && startX !== offsetX;
    let diff = offsetX - startX;

    if (!swiped) return;

    setIsSwiped(true);
    setPositionDiff(diff);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    e.stopPropagation();

    if (!sideButtonRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;

    if (!isSwiped) setIsOpen(!isOpen);
    if (isSwiped && positionDiff >= sideButtonWidth && !isOpen)
      onSwipeRight(item);
    if (isSwiped && positionDiff <= -sideButtonWidth && !isOpen)
      onSwipeLeft(item);

    setIsDown(false);
    setIsSwiped(false);
    setStartX(0);
    setPositionDiff(0);
  }

  function handleOnMouseLeave(e: React.MouseEvent) {
    e.stopPropagation();

    setIsDown(false);
    setIsSwiped(false);
    setStartX(0);
    setPositionDiff(0);
  }

  function handleTouchStart(e: React.TouchEvent) {
    e.stopPropagation();

    setIsDown(true);
    setStartX(e.touches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.stopPropagation();

    let offsetX = e.touches[0].clientX;
    let swiped = isDown && startX !== offsetX;
    let diff = offsetX - startX;

    if (!swiped) return;

    setIsSwiped(true);
    setPositionDiff(diff);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();

    if (!sideButtonRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;

    if (isSwiped && positionDiff >= sideButtonWidth && !isOpen)
      onSwipeRight(item);
    if (isSwiped && positionDiff <= -sideButtonWidth && !isOpen)
      onSwipeLeft(item);

    setIsDown(false);
    setIsSwiped(false);
    setStartX(0);
    setPositionDiff(0);
  }

  return (
    <li
      ref={itemRef}
      className={`accordion__item ${isOpen && "u__accordion--active"}`}
    >
      <aside ref={sideButtonRef} className={`accordion__edit`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </aside>
      <div className="accordion__question-and-answer">
        <div
          className={`accordion__slider`}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onMouseMove={handleOnMouseMove}
          onMouseLeave={handleOnMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="accordion__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${isOpen ? "u__accordion-icon--active" : "rotate-0"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          <div className="accordion__question">{item.question}</div>
        </div>
        <AnimateHeight duration={500} height={isOpen ? "auto" : 0}>
          <p className="accordion__answer">&#8211; {item.answer}</p>
        </AnimateHeight>
      </div>
      <aside className={`accordion__delete`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </aside>
    </li>
  );
}

export default AccordionItem;
