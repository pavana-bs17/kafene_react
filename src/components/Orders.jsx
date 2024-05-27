import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import logo from '../assests/logo.png';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    New: true,
    Packed: true,
    InTransit: true,
    Delivered: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = window.localStorage.getItem("loginStatus");
    if (loginStatus !== "true") {
      navigate("/login");
    } else {
      getOrders();
    }
  }, [filters, navigate]);

  const getOrders = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((response) => {
        const filteredOrders = response.data.filter(
          (order) => filters[order.orderStatus]
        );
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  };

  const handleFilterChange = (status) => {
    setFilters({ ...filters, [status]: !filters[status] });
  };

  return (
    <div id="orders">
      <div className="maincontainer">
        <h1>Orders</h1>
        <div className="Homepageorders">
          <div id="filters">
            <h3>Filters</h3>
            <p id="count">Count: {orders.length}</p>
            {Object.keys(filters).map((status) => (
              <p key={status}>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={filters[status]}
                    onChange={() => handleFilterChange(status)}
                  />
                  {status}
                </label>
              </p>
            ))}
          </div>
          <table className="Homepage_OrderTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="tablebody">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.amount}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
