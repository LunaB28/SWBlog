
import React from "react";
import { useStore } from "../store/store.js";

export const Saved = () => {
  const { state, dispatch } = useStore();
  return (
    <div className="text-center m-5">
      <h2>Guardados</h2>
      <div className="row mt-4">
        {state.saved.length === 0 && <div>No hay elementos guardados.</div>}
        {state.saved.map(item => (
          <div className="col-3 mb-4" key={item.uid}>
            <Link to={`/${item.type}/${item.uid}`} style={{ textDecoration: "none" }}>
              <div className="card h-100">
                <img
                  src="https://placehold.co/600x400"
                  className="card-img-top img-fluid"
                  alt={item.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Type: {item.type}</p>
                  <div className="mt-auto d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={e => { e.preventDefault(); dispatch({ type: "REMOVE_SAVED", payload: item }); }}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Saved;
