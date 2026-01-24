const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyCustomerToken } = require('../middleware/auth');

const cartFile = path.join(__dirname, '../data/carts.json');

// Helper functions
const getCarts = () => {
  if (!fs.existsSync(cartFile)) {
    fs.writeFileSync(cartFile, JSON.stringify({}), 'utf8');
  }
  return JSON.parse(fs.readFileSync(cartFile, 'utf8'));
};

const saveCarts = (carts) => {
  fs.writeFileSync(cartFile, JSON.stringify(carts, null, 2), 'utf8');
};

// Get user's cart
router.get('/', verifyCustomerToken, (req, res) => {
  try {
    const carts = getCarts();
    const cart = carts[req.userId] || [];
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/add', verifyCustomerToken, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity required' });
    }

    const carts = getCarts();
    if (!carts[req.userId]) {
      carts[req.userId] = [];
    }

    const existingItem = carts[req.userId].find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[req.userId].push({ productId, quantity });
    }

    saveCarts(carts);

    res.json({
      success: true,
      message: 'Item added to cart',
      cart: carts[req.userId]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.post('/remove', verifyCustomerToken, (req, res) => {
  try {
    const { productId } = req.body;

    const carts = getCarts();
    if (carts[req.userId]) {
      carts[req.userId] = carts[req.userId].filter(item => item.productId !== productId);
      saveCarts(carts);
    }

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: carts[req.userId] || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.post('/clear', verifyCustomerToken, (req, res) => {
  try {
    const carts = getCarts();
    carts[req.userId] = [];
    saveCarts(carts);

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
