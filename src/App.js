import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import "./App.css";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" index element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={ <PageNotFound/> } />
        
    
    </Routes>
  </BrowserRouter>

 

  );
}

export default App;
