import AccordionItem from "./AccordionItem";

interface Props<T extends { _id: string; question: string; answer: string }> {
  items: T[];
  onSwipeRight: (value: T) => void;
  onSwipeLeft: (value: T) => void;
}

function Accordion<
  T extends { _id: string; question: string; answer: string }
>({ items, onSwipeRight, onSwipeLeft }: Props<T>) {
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
