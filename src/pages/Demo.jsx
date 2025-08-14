// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import { useStore } from "../store/store.js";

export const Demo = () => {
  // Acceso al estado global y dispatch usando useStore
  const { state, dispatch } = useStore();

  return (
    <div className="container">
      <ul className="list-group">
        {/* Aquí deberías mapear sobre state.saved o state.favorite según tu lógica */}
        {/* Ejemplo: */}
        {state.saved && state.saved.map((item) => {
          return (
            <li
              key={item.uid}
              className="list-group-item d-flex justify-content-between"
            >
              <Link to={"/single/" + item.uid}>Link to: {item.name} </Link>
              <button className="btn btn-success"
                onClick={() => dispatch({
                  type: "REMOVE_SAVED",
                  payload: item
                })}>
                Quitar de guardados
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
