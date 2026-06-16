import {configureStore} from '@reduxjs/toolkit';
import navbarReducer from '../features/Navbar/navbarSlice';
import authreducer from "../features/authSlice"
import otherFeaturesReducer from '../features/otherFeatures';
import uploadReducer from "../features/uploadFeature"

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        authorization: authreducer,
        features: otherFeaturesReducer,
        uploadFeature: uploadReducer
    }
    
    
})