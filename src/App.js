import NavigationBar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import Footer from "./Components/Footer";
import HomePage from "./pages/homePage";
import PropertyView from "./pages/ViewProperty";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPre />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/property/:id" element={<PropertyView />} />
        
   
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
