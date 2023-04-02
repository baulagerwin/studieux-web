import FilterByItem from "./FilterByItem";

interface Props<T extends { _id: string; name: string }> {
  allItems: T;
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  xBy: string;
  onXBy: (value: string) => void;
  items: T[];
  limitLength: number;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
}

function FilterByItems<T extends { _id: string; name: string }>({
  allItems,
  isXOpen,
  onXOpen,
  xBy,
  onXBy,
  items,
  limitLength,
  onSwipeRight,
  onSwipeLeft,
}: Props<T>) {
  return (
    <ul
      className={`filter-by__items ${isXOpen && "u__visibility--visible"} ${
        items.length > limitLength ? "u__dropDown--height" : ""
      }`}
    >
      <li
        className={`filter-by__text ${
          xBy === allItems.name && "u__dropDown--active"
        }`}
        onClick={() => {
          onXBy(allItems.name);
          onXOpen(false);
        }}
      >
        {allItems.name}
      </li>
      {items.map((item) => {
        return (
          <FilterByItem
            key={item._id}
            isXOpen={isXOpen}
            onXOpen={onXOpen}
            xBy={xBy}
            onXBy={onXBy}
            item={item}
            items={items}
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
          />
        );
      })}
    </ul>
  );
}

export default FilterByItems;
