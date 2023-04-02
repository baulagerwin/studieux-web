import { useState } from "react";

function useActivePopUp(): [string, (value: string) => void] {
  const [activePopUp, setActivePopUp] = useState("");

  function handleOnActivePopUp(value: string) {
    setActivePopUp(value);
  }

  return [activePopUp, handleOnActivePopUp];
}

export default useActivePopUp;
