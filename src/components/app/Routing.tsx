import { Route, Routes } from "react-router-dom";
import Authenticated from "../../middleware/Authenticated";
import Index from "../../middleware/Index";
import Logout from "../../middleware/Logout";
import Unauthenticated from "../../middleware/Unauthenticated";
import Navbar from "../navbar/Navbar";
import Notebook from "../notebooks/Notebook";
import Notebooks from "../notebooks/Notebooks";
import Review from "../review/Review";
import Auth from "../auth/Auth";
import User from "../user/User";
import NotFound from "../notFound/NotFound";

function Routing() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route element={<Authenticated />}>
          <Route index element={<Index />} />
          <Route path="notebooks">
            <Route index element={<Notebooks />} />
            <Route path=":notebookId" element={<Notebook />} />
          </Route>
          <Route path="review">
            <Route path=":notebookId" element={<Review />} />
          </Route>
        </Route>
        <Route element={<Unauthenticated />}>
          <Route path="signup" element={<User />} />
          <Route path="signin" element={<Auth />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Routing;
