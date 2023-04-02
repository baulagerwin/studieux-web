interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

function PopUp({ children, onClose }: Props) {
  return (
    <div
      className="popup"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div className="content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default PopUp;
