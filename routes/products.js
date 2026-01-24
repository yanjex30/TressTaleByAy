const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyCustomerToken } = require('../middleware/auth');

const productsFile = path.join(__dirname, '../data/products.json');

// Initialize products file with sample data
const initializeProducts = () => {
  if (!fs.existsSync(productsFile)) {
    const sampleProducts = [
      {
        id: 1,
        name: "Wine Wave",
        category: "wigs",
        price: 45000,
        image: "./IMG/wig1.JPG",
        badge: "Best Seller",
        description: "Premium wine front wig with natural wave pattern",
        type: "Lace Front",
        stock: 10
      },
      {
        id: 2,
        name: "Midnight Curls",
        category: "wigs",
        price: 38000,
        image: "./IMG/wig2.JPG",
        badge: "Sale",
        description: "Deep wave curls with protective cap included",
        type: "Full Wig",
        stock: 8
      },
      {
        id: 101,
        name: "Floral Essence",
        category: "perfumes",
        price: 15000,
        image: "./IMG/perfume1.JPG",
        badge: "New",
        description: "Fresh floral fragrance",
        type: "Eau de Parfum",
        stock: 20
      }
    ];
    fs.writeFileSync(productsFile, JSON.stringify(sampleProducts, null, 2), 'utf8');
  }
};

// Helper functions
const getProducts = () => {
  initializeProducts();
  return JSON.parse(fs.readFileSync(productsFile, 'utf8'));
};

const saveProducts = (products) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
};

// Get all products
router.get('/', (req, res) => {
  try {
    const products = getProducts();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
router.get('/category/:category', (req, res) => {
  try {
    const products = getProducts();
    const filtered = products.filter(p => p.category === req.params.category);
    res.json({ success: true, products: filtered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
