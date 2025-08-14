

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/store.js";

export const CardFullViex = () => {
    const { type, uid } = useParams();
    const { state } = useStore();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = "";
        if (type === "people") url = `https://www.swapi.tech/api/people/${uid}`;
        else if (type === "vehicles") url = `https://www.swapi.tech/api/vehicles/${uid}`;
        else if (type === "planets") url = `https://www.swapi.tech/api/planets/${uid}`;
        if (!url) return;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setItem({ ...json.result.properties, uid, type, name: json.result.properties.name });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [type, uid]);

    // Simulación de datos relacionados (puedes ajustar según tu modelo de datos)
    const related = [
        ...state.saved.filter(i => i.type === type && i.uid !== uid),
        ...state.favorite.filter(i => i.type === type && i.uid !== uid)
    ];

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!item) return <div className="container mt-5">Not found</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img
                        src="https://placehold.co/800x600"
                        alt={item.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{item.name}</h2>
                    <p><strong>Type:</strong> {item.type}</p>
                    <p><strong>UID:</strong> {item.uid}</p>
                    {item.type === "people" && (
                        <>
                            {item.birth_year && <p><strong>Birth year:</strong> {item.birth_year}</p>}
                            {item.eye_color && <p><strong>Eye color:</strong> {item.eye_color}</p>}
                            {item.gender && <p><strong>Gender:</strong> {item.gender}</p>}
                            {item.hair_color && <p><strong>Hair color:</strong> {item.hair_color}</p>}
                            {item.height && <p><strong>Height:</strong> {item.height} cm</p>}
                            {item.mass && <p><strong>Mass:</strong> {item.mass} kg</p>}
                            {item.skin_color && <p><strong>Skin color:</strong> {item.skin_color}</p>}
                            {item.species && item.species.length > 0 && <p><strong>Species:</strong> {item.species.join(", ")}</p>}
                            {/* Homeworld and Vehicles as related cards below */}
                        </>
                    )}
                    {item.type === "vehicles" && (
                        <>
                            {item.model && <p><strong>Model:</strong> {item.model}</p>}
                            {item.vehicle_class && <p><strong>Class:</strong> {item.vehicle_class}</p>}
                            {item.manufacturer && <p><strong>Manufacturer:</strong> {item.manufacturer}</p>}
                            {item.length && <p><strong>Length:</strong> {item.length} m</p>}
                            {item.cost_in_credits && <p><strong>Cost:</strong> {item.cost_in_credits} credits</p>}
                            {item.crew && <p><strong>Crew:</strong> {item.crew}</p>}
                            {item.passengers && <p><strong>Passengers:</strong> {item.passengers}</p>}
                            {item.max_atmosphering_speed && <p><strong>Max speed:</strong> {item.max_atmosphering_speed}</p>}
                            {item.cargo_capacity && <p><strong>Cargo capacity:</strong> {item.cargo_capacity} kg</p>}
                            {item.consumables && <p><strong>Consumables:</strong> {item.consumables}</p>}
                            {item.pilots && item.pilots.length > 0 && <p><strong>Pilots:</strong> {item.pilots.join(", ")}</p>}
                        </>
                    )}
                    {item.type === "planets" && (
                        <>
                            {item.diameter && <p><strong>Diameter:</strong> {item.diameter} km</p>}
                            {item.rotation_period && <p><strong>Rotation period:</strong> {item.rotation_period} h</p>}
                            {item.orbital_period && <p><strong>Orbital period:</strong> {item.orbital_period} days</p>}
                            {item.gravity && <p><strong>Gravity:</strong> {item.gravity}</p>}
                            {item.population && <p><strong>Population:</strong> {item.population}</p>}
                            {item.climate && <p><strong>Climate:</strong> {item.climate}</p>}
                            {item.terrain && <p><strong>Terrain:</strong> {item.terrain}</p>}
                            {item.surface_water && <p><strong>Surface water:</strong> {item.surface_water}%</p>}
                            {item.residents && item.residents.length > 0 && <p><strong>Residents:</strong> {item.residents.join(", ")}</p>}
                        </>
                    )}
                </div>
            </div>
            <div className="mt-5">
                <h4>Related</h4>
                <div className="row">
                    {/* Homeworld as related card */}
                    {item.type === "people" && item.homeworld && (
                        <div className="col-3 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-title">Homeworld</h6>
                                    <a href={item.homeworld} target="_blank" rel="noopener noreferrer">{item.homeworld}</a>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Vehicles as related cards */}
                    {item.type === "people" && item.vehicles && item.vehicles.length > 0 && item.vehicles.map((vehicleUrl, idx) => (
                        <div className="col-3 mb-3" key={vehicleUrl}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-title">Vehicle {idx + 1}</h6>
                                    <a href={vehicleUrl} target="_blank" rel="noopener noreferrer">{vehicleUrl}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Other related items (saved/favorite) */}
                    {related.length === 0 && <div className="col"></div>}
                    {related.map(rel => (
                        <div className="col-3 mb-3" key={rel.uid}>
                            <Link to={`/${rel.type}/${rel.uid}`} style={{ textDecoration: "none" }}>
                                <div className="card h-100">
                                    <img
                                        src="https://placehold.co/400x300"
                                        className="card-img-top"
                                        alt={rel.name}
                                        style={{ objectFit: "cover", height: "150px" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title">{rel.name}</h6>
                                        <p className="card-text">{rel.type}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardFullViex;
