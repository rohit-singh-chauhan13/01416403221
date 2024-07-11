require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.get('/categories/:categoryName/products', async (req, res) => {
  const { categoryName } = req.params;
  const { n, minPrice, maxPrice, sortBy, order, page } = req.query;

  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/your_company_name/categories/${categoryName}/products/top-${n}?minPrice=${minPrice}&maxPrice=${maxPrice}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    let products = response.data;

    if (sortBy && order) {
      products = products.sort((a, b) => {
        if (order === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    }

    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories/:categoryName/products/:productId', async (req, res) => {
  const { categoryName, productId } = req.params;

  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/your_company_name/categories/${categoryName}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
