const faker = require('faker');
const mongoose = require('mongoose');

// Connect to MongoDB
// Connection URL here
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  category: String,
  price: Number,
  productType: String,
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);


function generatetag() {
  const types = ['Electronics', 'Clothing','Men','Women', 'Home', 'Beauty', 'Sports'];
  return faker.random.arrayElement(types);
}


// Generate a random product type
function generateProductType() {
  const types = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];
  return faker.random.arrayElement(types);
}

// Generate a random price between $10 and $500
function generatePrice() {
  return faker.random.number({ min: 10, max: 500 });
}

// Generate 10,000 products and save them to the database
async function generateProducts() {
  for (let i = 0; i < 10000; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      tags: [generatetag(),generatetag(),generatetag()],
      category: faker.commerce.department(),
      price: generatePrice(),
      productType: generateProductType(),
    });

    await product.save();
  }

  console.log('Products generated and saved successfully.');
  mongoose.disconnect();
}

generateProducts();
