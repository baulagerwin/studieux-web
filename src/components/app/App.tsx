import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={true}
        bodyClassName="u__toast--container"
      />
      <Routing />
    </>
  );
}

export default App;
