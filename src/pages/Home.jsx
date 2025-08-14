import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/store.js"; // Usa el store global

export const Home = () => {
    const { state, dispatch } = useStore();
    const [activeTab, setActiveTab] = useState("all");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const tabs = [
        { key: "all", label: "All" },
        { key: "people", label: "Characters" },
        { key: "vehicles", label: "Vehicles" },
        { key: "planets", label: "Planets" }
    ];

    const fetchPeople = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://www.swapi.tech/api/people/");
            const json = await res.json();
            setData(json.results.map(item => ({ ...item, type: "people" })));
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://www.swapi.tech/api/vehicles/");
            const json = await res.json();
            setData(json.results.map(item => ({ ...item, type: "vehicles" })));
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlanets = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://www.swapi.tech/api/planets/");
            const json = await res.json();
            setData(json.results.map(item => ({ ...item, type: "planets" })));
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAll = async () => {
        setLoading(true);
        try {
            const results = [];
            // Fetch people
            const resPeople = await fetch("https://www.swapi.tech/api/people/");
            const jsonPeople = await resPeople.json();
            results.push(...jsonPeople.results.map(item => ({ ...item, type: "people" })));
            // Fetch vehicles
            const resVehicles = await fetch("https://www.swapi.tech/api/vehicles/");
            const jsonVehicles = await resVehicles.json();
            results.push(...jsonVehicles.results.map(item => ({ ...item, type: "vehicles" })));
            // Fetch planets
            const resPlanets = await fetch("https://www.swapi.tech/api/planets/");
            const jsonPlanets = await resPlanets.json();
            results.push(...jsonPlanets.results.map(item => ({ ...item, type: "planets" })));
            setData(results);
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "all") fetchAll();
        else if (activeTab === "people") fetchPeople();
        else if (activeTab === "vehicles") fetchVehicles();
        else if (activeTab === "planets") fetchPlanets();
    }, [activeTab]);

    const fetchDetails = async (item) => {
        // Detectar endpoint según tipo
        let url = "";
        if (item.type === "people") url = `https://www.swapi.tech/api/people/${item.uid}`;
        else if (item.type === "vehicles") url = `https://www.swapi.tech/api/vehicles/${item.uid}`;
        else if (item.type === "planets") url = `https://www.swapi.tech/api/planets/${item.uid}`;
        if (!url) return item;
        try {
            const res = await fetch(url);
            const json = await res.json();
            return { ...json.result.properties, uid: item.uid, type: item.type, name: item.name };
        } catch {
            return item;
        }
    };

    const handleSave = async (item) => {
        const isSaved = state.saved.some(i => i.uid === item.uid && i.type === item.type);
        if (!isSaved) {
            const fullItem = await fetchDetails(item);
            dispatch({ type: "ADD_SAVED", payload: fullItem });
        } else {
            dispatch({ type: "REMOVE_SAVED", payload: item });
        }
    };

    const handleFavorite = async (item) => {
        const isFavorite = state.favorite.some(i => i.uid === item.uid && i.type === item.type);
        if (!isFavorite) {
            const fullItem = await fetchDetails(item);
            dispatch({ type: "ADD_FAVORITE", payload: fullItem });
        } else {
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        }
    };

    const goToSaved = () => navigate("/saved");
    const goToFavorites = () => navigate("/favorites");

    return (
        <div className="text-center m-5">
            <ul className="nav nav-tabs">
                {tabs.map(tab => (
                    <li className="nav-item" key={tab.key}>
                        <button
                            className={`nav-link${activeTab === tab.key ? " active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="row mt-4">
                {loading && <div>Loading...</div>}
                {!loading && data.map(item => {
                    const isSaved = state.saved.some(i => i.uid === item.uid && i.type === item.type);
                    const isFavorite = state.favorite.some(i => i.uid === item.uid && i.type === item.type);
                    return (
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
                                        <h5 className="card-title" >{item.name}</h5>
                                        <p className="card-text">Type: {item.type}</p>
                                        <div className="mt-auto d-flex justify-content-end gap-2">
                                            <button
                                                className={`btn btn-outline-primary btn-sm${isSaved ? " active" : ""}`}
                                                style={isSaved ? { backgroundColor: "#0d6efd", color: "#fff", borderColor: "#0d6efd" } : {}}
                                                onClick={async e => { e.preventDefault(); await handleSave(item); }}
                                            >
                                                {isSaved ? "Saved" : "Save"}
                                            </button>
                                            <button
                                                className={`btn btn-outline-warning btn-sm${isFavorite ? " active" : ""}`}
                                                style={isFavorite ? { backgroundColor: "#ffc107", color: "#212529", borderColor: "#ffc107" } : {}}
                                                onClick={async e => { e.preventDefault(); await handleFavorite(item); }}
                                            >
                                                {isFavorite ? "Favorited" : "Favorite"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};