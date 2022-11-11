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

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/restaurant/" element={<AllRestaurants/>}/>
        <Route path="/restaurant/create" element={<CreateRestaurant/>}/>
        <Route path="/restaurant/details" element={<RestaurantDetails/>}/>


        {/* Errores */}
        <Route path="*" element={<NotFound/>}/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
