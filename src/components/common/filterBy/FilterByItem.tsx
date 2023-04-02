import { useEffect, useRef, useState } from "react";

interface Props<T extends { name: string }> {
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  xBy: string;
  onXBy: (value: string) => void;
  item: T;
  items: T[];
  swipeable?: boolean;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
}

function FilterByItem<T extends { _id: string; name: string }>({
  isXOpen,
  onXOpen,
  xBy,
  onXBy,
  item,
  items,
  onSwipeRight = (item) => {},
  onSwipeLeft = (item) => {},
}: Props<T>) {
  const itemRef = useRef<HTMLDivElement>(null);
  const sideButtonRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [endX, setEndX] = useState<number>(0);
  const [positionDiff, setPositionDiff] = useState<number>(0);

  useEffect(() => {
    if (!sideButtonRef.current || !itemRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;
    let scrollX = sideButtonWidth - positionDiff;

    itemRef.current.scroll(scrollX, 0);
  }, [positionDiff, items]);

  function deleteItem(item: T) {
    console.log("deletedItem");
  }

  function editItem(item: T) {
    console.log("editItem");
  }

  function handleOnMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseMove(e: React.MouseEvent) {
    e.stopPropagation();

    let offsetX = e.nativeEvent.pageX;
    let diff = offsetX - startX;

    if (isDown) {
      setPositionDiff(diff);
      setEndX(offsetX);
    }
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    e.stopPropagation();

    if (!sideButtonRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;

    if (positionDiff >= sideButtonWidth) onSwipeRight(item);
    if (positionDiff <= -sideButtonWidth) onSwipeLeft(item);

    setIsDown(false);
    setStartX(0);
    setPositionDiff(0);

    if (startX !== e.nativeEvent.pageX) return;
    onXBy(item.name);
    onXOpen(false);
  }

  function handleOnMouseLeave(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
    setPositionDiff(0);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.touches[0].clientX);
  }

  function handleOnTouchMove(e: React.TouchEvent) {
    e.stopPropagation();

    let offsetX = e.touches[0].clientX;
    let diff = offsetX - startX;

    if (isDown) setPositionDiff(diff);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();

    if (!sideButtonRef.current) return;
    let sideButtonWidth = sideButtonRef.current.offsetWidth;

    if (positionDiff >= sideButtonWidth) onSwipeRight(item);
    if (positionDiff <= -sideButtonWidth) onSwipeLeft(item);

    setIsDown(false);
    setStartX(0);
    setEndX(0);
    setPositionDiff(0);

    if (startX !== endX) return;
    onXBy(item.name);
    onXOpen(false);
  }

  return (
    <li>
      <div
        ref={itemRef}
        className={`filter-by__slider ${
          xBy === item.name && "u__dropDown--active"
        }`}
      >
        <aside
          ref={sideButtonRef}
          className={`filter-by__aside filter-by__aside--edit`}
        >
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
        <div
          className="filter-by__text"
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseUp={handleOnMouseUp}
          onMouseLeave={handleOnMouseLeave}
          onTouchStart={handleOnTouchStart}
          onTouchMove={handleOnTouchMove}
          onTouchEnd={handleOnTouchEnd}
        >
          {item.name}
        </div>

        <aside className={`filter-by__aside filter-by__aside--delete`}>
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
      </div>
    </li>
  );
}

export default FilterByItem;
