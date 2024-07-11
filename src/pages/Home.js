import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Product Comparison App</h2>
      <nav>
        <ul>
          <li><Link to="/categories/Phone/products">Phones</Link></li>
          <li><Link to="/categories/Computer/products">Computers</Link></li>
          <li><Link to="/categories/Tablet/products">Tablets</Link></li>
          <li><Link to="/categories/Charger/products">Chargers</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;

