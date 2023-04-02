import FilterByButton from "./FilterByButton";
import FilterByItems from "./FilterByItems";
interface Props<T extends { _id: string; name: string }> {
  label: string;
  cN?: string;
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  xBy: string;
  onXBy: (value: string) => void;
  limitLength: number;
  allItems: T;
  items: T[];
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
}

function FilterBy<T extends { _id: string; name: string }>({
  label,
  cN = "",
  isXOpen,
  onXOpen,
  xBy,
  onXBy,
  allItems,
  items,
  limitLength,
  onSwipeRight,
  onSwipeLeft,
}: Props<T>) {
  return (
    <div className={`filter-by ${cN}`}>
      <FilterByButton
        label={label}
        isXOpen={isXOpen}
        onXOpen={onXOpen}
        xBy={xBy}
      />
      <FilterByItems
        allItems={allItems}
        isXOpen={isXOpen}
        onXOpen={onXOpen}
        xBy={xBy}
        onXBy={onXBy}
        items={items}
        limitLength={limitLength}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </div>
  );
}

export default FilterBy;
