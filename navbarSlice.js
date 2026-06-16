import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSearchOpen: false,
    isLoginOpen: false,
    isMenuOpen: false,
    isCategoryOpen: false
};

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },

        toggleLogin: (state) => {
            state.isLoginOpen = !state.isLoginOpen;
        },

         toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },

        toggleCategory: (state) => {
            state.isCategoryOpen = !state.isCategoryOpen
        }
    },
});

export const { toggleSearch, toggleLogin, toggleMenu, toggleCategory } = navbarSlice.actions; // ✅ Action export
export default navbarSlice.reducer; // ✅ Reducer export
