import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [products, setProdructs] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  const token = currentUser.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:8000/api/products", config);
      console.log(res.data);
      setProdructs(res.data);
    };
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/products/${productId}`,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home">
      <div className="main">
        <button onClick={logout}>logout</button>
        <h1>Frontend Laravel Api</h1>
        <Link to="/add" className="link">
          <button className="add">Add Product</button>
        </Link>
        <h2>welcome, {currentUser.user.name}</h2>
        <div className="layout">
          {products.map((product) => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>$ {product.price}</p>
              <Link to={`/detail/${product.id}`}>
                <button>detail</button>
              </Link>
              <Link to={`/edit/${product.id}`}>
                <button>edit</button>
              </Link>

              <button onClick={() => deleteProduct(product.id)}>hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
