import { useEffect } from "react";

function useClose(closeAll: () => void) {
  useEffect(() => {
    document.addEventListener("click", closeAll);

    return () => document.removeEventListener("click", closeAll);
  });
}

export default useClose;
