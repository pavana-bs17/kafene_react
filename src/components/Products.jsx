import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/Products.css';
import logo from '../assests/logo.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    expired: true,
    lowstock: true
  });

  useEffect(() => {
    // Check login status and redirect if necessary
    let status = window.localStorage.getItem("loginStatus");
    if (status !== "true") {
      window.location.href = "/login";
    }
    getProducts();
  }, []);

  useEffect(() => {
    renderProducts(products);
  }, [filters, products]);

  const logOut = () => {
    window.localStorage.setItem("loginStatus", "false");
    window.location.href = "/login";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getProducts = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked
    });
  };

  const renderProducts = (products) => {
    const { expired, lowstock } = filters;
    const today = formatDate(new Date());

    const filteredProducts = products.filter((product) => {
      const isExpired = formatDate(product.expiryDate) < today;
      const isLowStock = product.stock < 100;
      if (expired && lowstock) return isExpired || isLowStock;
      if (expired) return isExpired;
      if (lowstock) return isLowStock;
      return true;
    });

    return filteredProducts.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.medicineName}</td>
        <td>{product.medicineBrand}</td>
        <td>{product.expiryDate}</td>
        <td>{product.unitPrice}</td>
        <td>{product.stock}</td>
      </tr>
    ));
  };

  return (
      <div id="products" className="maincontainer">
        <h1>Products</h1>
        <div className="Homepageorders">
          <div id="filters">
            <p id="filtxt"><b>Filters</b></p>
            <p id="total">Count: {renderProducts(products).length}</p>
            <div>
              <p>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="expired"
                    checked={filters.expired}
                    onChange={handleFilterChange}
                  />
                  Expired
                </label>
              </p>
              <p>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="lowstock"
                    checked={filters.lowstock}
                    onChange={handleFilterChange}
                  />
                  Low Stock
                </label>
              </p>
            </div>
          </div>

          <table className="Homepage_OrderTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody id="mytabledata">
              {renderProducts(products)}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Products;
