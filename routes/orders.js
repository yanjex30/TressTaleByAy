const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyCustomerToken } = require('../middleware/auth');

const ordersFile = path.join(__dirname, '../data/orders.json');
const usersFile = path.join(__dirname, '../data/users.json');

// Helper functions
const getOrders = () => {
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([]), 'utf8');
  }
  return JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
};

const saveOrders = (orders) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
};

const getUsers = () => {
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
};

// Create order
router.post('/', verifyCustomerToken, (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const newOrder = {
      id: 'ORD-' + Date.now(),
      userId: req.userId,
      userEmail: req.userEmail,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    // Update user's orders
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === req.userId);
    if (userIndex !== -1) {
      if (!users[userIndex].orders) users[userIndex].orders = [];
      users[userIndex].orders.push(newOrder.id);
      saveUsers(users);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's orders
router.get('/my-orders', verifyCustomerToken, (req, res) => {
  try {
    const orders = getOrders();
    const userOrders = orders.filter(o => o.userId === req.userId);
    
    res.json({
      success: true,
      orders: userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:orderId', verifyCustomerToken, (req, res) => {
  try {
    const orders = getOrders();
    const order = orders.find(o => o.id === req.params.orderId && o.userId === req.userId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
