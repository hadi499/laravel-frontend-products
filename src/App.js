import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import AddProduct from "./components/AddProduct";
import Register from "./components/Register";
import DetailProduct from "./components/DetailProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="detail/:id" element={<DetailProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route
          path="login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
