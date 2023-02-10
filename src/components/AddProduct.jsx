import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { AuthContext } from "../context/authContext";

const AddProduct = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        "http://localhost:8000/api/products",
        {
          name: name,
          slug: slug,
          description: description,
          price: parseFloat(price),
        },
        config
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <form className="myform" onSubmit={createProduct}>
        <h3>Add Product</h3>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="slug">slug</label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="price">price</label>
        <input
          type="number"
          name="price"
          id="price"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
