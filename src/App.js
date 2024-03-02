import Login from "./components/Login";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import "./App.css";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";

function App() {
  
  return (
     <HashRouter>
    <Routes>
        <Route path="/" index element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={ <PageNotFound/> } />
        
    
    </Routes>
  </ HashRouter>

 

  );
}

export default App;
