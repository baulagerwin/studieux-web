import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={true}
        bodyClassName="u__toast--container"
      />
      <Routing />
    </div>
  );
}

export default App;
