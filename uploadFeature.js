import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddChapters: false,
    content: []
}

export const uploadSlice = createSlice({
    name: "uploadFeature",
    initialState,
    reducers: {
        setIsAddChapters: (state) => {
            state.isAddChapters = !state.isAddChapters
        },

        setContent: (state, action) => {
            state.content = action.payload
        },

        addContent: (state, action) => {
  if (action.payload.replace) {
    state.content = action.payload.content; // replace whole array
  } else {
    state.content.push(action.payload);
  }
}
    }
})

export const {setIsAddChapters, setContent, addContent} = uploadSlice.actions
export default uploadSlice.reducer