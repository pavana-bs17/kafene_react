import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';

const Users = () => {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let status = window.localStorage.getItem("loginStatus");
    if (status !== "true") {
      window.location.href = "/login";
    }
    else{
        getUsers();
    }
  }, []);

  const getUsers = () => {
    axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then(response => {
        const mydatas = response.data;
        setUsers(mydatas);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    if (value.length >= 2) {
      axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?search=${value}`)
        .then(response => {
          const searchData = response.data;
          setUsers(searchData);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (value.length === 0) {
      getUsers();
    } else {
      alert("Please enter at least 2 characters");
    }
  };

  const handleResetClick = () => {
    setSearchValue('');
    getUsers();
  };

  return (
    <div id="users" className="maincontainer">
      <h1>Users</h1>

      <form className="UserList_FilterWrapper">
        <input
          className="UserList_SearchBox"
          type="search"
          id="search-box"
          placeholder="Search by Name"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <input type="reset" onClick={handleResetClick} className="UserList_Button" value="Reset" />
      </form>

      <div className="Homepageorders">
        <table className="Homepage_OrderTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Avatar</th>
              <th>Full Name</th>
              <th>DoB</th>
              <th>Gender</th>
              <th>Current Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><img src={user.profilePic} alt="avatar" /></td>
                <td>{user.fullName}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{`${user.currentCity} ${user.currentCountry}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
