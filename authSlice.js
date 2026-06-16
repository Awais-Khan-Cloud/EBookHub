import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    contact: "",
    password: "",
    token: ""
}

export const authSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.lastName = action.payload
        },
        setContact: (state, action) => {
            state.contact = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },

        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

export const { setFirstName, setLastName, setContact, setPassword, setToken } = authSlice.actions;
export default authSlice.reducer;