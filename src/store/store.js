import React, { createContext, useReducer, useContext } from "react";

// Limpiar localStorage para evitar datos incompletos antiguos
localStorage.removeItem("savedItems");
localStorage.removeItem("favoriteItems");
const initialState = {
    saved: [],
    favorite: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_SAVED":
            if (state.saved.some(i => i.uid === action.payload.uid && i.type === action.payload.type)) return state;
            const newSaved = [...state.saved, action.payload];
            localStorage.setItem("savedItems", JSON.stringify(newSaved));
            return { ...state, saved: newSaved };
        case "ADD_FAVORITE":
            if (state.favorite.some(i => i.uid === action.payload.uid && i.type === action.payload.type)) return state;
            const newFavorite = [...state.favorite, action.payload];
            localStorage.setItem("favoriteItems", JSON.stringify(newFavorite));
            return { ...state, favorite: newFavorite };
        case "REMOVE_SAVED":
            const filteredSaved = state.saved.filter(i => !(i.uid === action.payload.uid && i.type === action.payload.type));
            localStorage.setItem("savedItems", JSON.stringify(filteredSaved));
            return { ...state, saved: filteredSaved };
        case "REMOVE_FAVORITE":
            const filteredFavorite = state.favorite.filter(i => !(i.uid === action.payload.uid && i.type === action.payload.type));
            localStorage.setItem("favoriteItems", JSON.stringify(filteredFavorite));
            return { ...state, favorite: filteredFavorite };
        default:
            return state;
    }
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return React.createElement(
        StoreContext.Provider,
        { value: { state, dispatch } },
        children
    );
}

export function useStore() {
    return useContext(StoreContext);
}