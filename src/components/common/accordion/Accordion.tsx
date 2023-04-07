import IQNA from "../../../models/IQNA";
import AccordionItem from "./AccordionItem";

interface Props {
  items: IQNA[];
  onSwipeRight: (value: IQNA) => void;
  onSwipeLeft: (value: IQNA) => void;
}

function Accordion({ items, onSwipeRight, onSwipeLeft }: Props) {
  return (
    <ul className={`accordion u__accordion-margin-bottom--${items.length}`}>
      {items.map((item) => {
        return (
          <AccordionItem
            key={item._id}
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

export default Accordion;
