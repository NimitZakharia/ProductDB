const express = require('express');
const mongoose = require('mongoose');
const { performance } = require('perf_hooks');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Nimit:abcdefghi@productsdb.gq1cylj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Set up the view engine
app.set('view engine', 'ejs');

// Set up the static folder
app.use(express.static('public'));

// Middleware to measure response time
app.use((req, res, next) => {
  const start = performance.now();

  res.on('finish', () => {
    const end = performance.now();
    const duration = end - start;
    console.log(`Response time: ${duration} milliseconds`);
  });

  next();
});

// Define the route to the homepage with filtering options
app.get('/', async (req, res) => {
  try {
    const { tags, categories, minPrice, maxPrice, productType } = req.query;
    let filters = {};

    if (tags) {
      const tagsArray = tags.split(',');
      filters.tags = { $in: tagsArray };
    }

    if (categories) {
      const categoriesArray = categories.split(',');
      filters.category = { $in: categoriesArray };
    }

    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filters.price = { $gte: minPrice };
    } else if (maxPrice) {
      filters.price = { $lte: maxPrice };
    }

    if (productType) {
      filters.productType = productType;
    }

    const products = await Product.find(filters);

    res.render('index', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
