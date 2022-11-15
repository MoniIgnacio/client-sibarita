import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import CreateRestaurant from "./pages/CreateRestaurant";
import AllRestaurants from "./pages/AllRestaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Footer from "./components/Footer";
import Cartamodal from "./components/CartaModal";
import RestaurantEdit from "./pages/RestaurantEdit";
import ClientProfile from "./pages/ClientProfile";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/restaurant/" element={<AllRestaurants/>}/>
        <Route path="/restaurant/create" element={<CreateRestaurant/>}/>
        <Route path="/restaurant/:restId" element={<RestaurantDetails/>}/>
        <Route path="/restaurant/:restId/edit" element={<RestaurantEdit/>}/>
        <Route path="/restaurant/:restId/dish" element={<Cartamodal/>}/>
        <Route path="/user/:userId" element={<ClientProfile/>} />


        {/* Errores */}
        <Route path="*" element={<NotFound/>}/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
