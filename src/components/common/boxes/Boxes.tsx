import { Link } from "react-router-dom";
import INotebook from "../../notebooks/model/INotebook";

interface Props {
  notebooks: INotebook[];
}

function Boxes({ notebooks }: Props) {
  return (
    <ul className="boxes grid grid-col-4 gap-4">
      {notebooks.map((notebook: INotebook) => {
        return (
          <li key={notebook._id} className="boxes__item">
            <Link className="boxes__link" to={`/notebooks/${notebook._id}`}>
              {notebook.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Boxes;
