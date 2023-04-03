import React from "react";

interface Props {
  icon: React.ReactNode;
  onOpen: () => void;
}

function Mini({ icon, onOpen }: Props) {
  return (
    <button className="btn btn--icon" onClick={onOpen}>
      {icon}
    </button>
  );
}

export default Mini;
