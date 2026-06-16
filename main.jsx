import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import './index.css'; 
import {store} from "./app/store.js"; 
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home from "./Pages/Homepage.jsx"
import StartUpPage from "./Pages/StartupPage.jsx";
import ProtectedRoute from "./Components/NavbarComponents/ProtectedComponent.jsx";
import MetaBox from "./Pages/MetaBox.jsx";
import AuthorBookUpload from "./Pages/AuthorComponents/AuthorBookUpload.jsx";
import LoginCard from "./Pages/Authhorization/Login.jsx";
import CreateAccount from "./Pages/Authhorization/CreateAccount.jsx";
import AuthorLogin from "./Pages/AuthorAuth/AuthorLogin.jsx";
import AuthorSignup from "./Pages/AuthorAuth/AuthorRegistration.jsx";
import Content from "./Pages/Content.jsx";
import NotFound from "./Pages/NotFound.jsx";





const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      
      
          <Route index={true}  element={<Home />} />
      

        
      
      <Route path="metaData/:id" element={<MetaBox />} />
      <Route path="login" element={<LoginCard />} />
      <Route path="createAccount" element={<CreateAccount />} />
      <Route path=":category/:subCategory" element={<Content />} />
      <Route path="/notFound" element={<NotFound />}/>
  


      <Route path="" element={<ProtectedRoute />}>
        <Route path="authorUpload" element={<AuthorBookUpload />} />
        <Route path="authorSignUp" element={<AuthorSignup />} />
        <Route path="authorLogin" element={<AuthorLogin />} />
      </Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);