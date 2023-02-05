import React, { useState, useEffect } from "react";
import axios from "axios";
import bannerImg from "./banner.jpg";
import "./Banner.css";
import { Navbar, Nav} from 'react-bootstrap';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faSearch);
const Banner = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");

      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let filteredProducts = products;
  if (category !== "all") {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }

  if (filteredProducts) {
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div className="banner">
      <img className="ban_photo" src={bannerImg} alt="banner" />
      <h1 className="website-name">ShopLIFT</h1>
      <Navbar bg="light" expand="lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">HOME</Nav.Link>
      <Nav.Link href="#news">OFFERS</Nav.Link>
      <Nav.Link href="#contact">Contact</Nav.Link>
      <Nav.Link href="#about">Cart</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

      <div className="filter">
        <select value={category} onChange={handleCategory}>
          <option value="all">All</option>
          <option value="men's clothing">For Men</option>
          <option value="women's clothing">For Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
        <input
          type="text"
          value={search}
          placeholder="Search and press Enter"
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
              // handleSearch(e);
            }
          }}
        />
        <FontAwesomeIcon
          className="faicons"
          icon="search"
          onClick={handleSubmit}
          role="button"
          tabIndex="0"
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product">
              <img
                className="pro_img"
                src={product.image}
                alt={product.title}
              />
              <span>
                <h3>{product.title}</h3>
                <p>{product.category}</p>
                <p>${product.price}</p>
              </span>
            </div>
          ))
        ) : (
          <p>NO PRODUCTS FOUND, PLEASE CHECK</p>
        )}
      </div>
    </div>
  );
};

export default Banner;
