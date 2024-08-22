import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Footer, Header, Home, Login, PhotoDetails, Profile, Register } from "./components/Index";
import "./App.css";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/photo" element={<Home/>}/>
          <Route path="/photo/:photoid" element={<PhotoDetails/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/register" element={<Register/>}/>
          <Route path="/auth/forgotpassword"/>
          <Route path="/auth/active-account/:key"/>
          <Route path="/auth/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </Container>
  );
}

export default App;