import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileClose: false,
    toggleProfileBox: false,
    profileImage: null,
    previewUrl: null
}

export const otherFeatureSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        setFileClose: (state, action) => {
            state.profileClose = action.payload
        },

        setToggleProfileBox: (state) => {
            state.toggleProfileBox = !state.toggleProfileBox
        },

        setProfileImage: (state, action) => {
            state.profileImage = action.payload
        },

        setPreviewUrl: (state, action) => {
            state.previewUrl = action.payload
        }
    }
})

export const {setFileClose, setToggleProfileBox, setProfileImage, setPreviewUrl} = otherFeatureSlice.actions
export default otherFeatureSlice.reducer