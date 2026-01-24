const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyAdminToken } = require('../middleware/auth');

const ordersFile = path.join(__dirname, '../data/orders.json');
const productsFile = path.join(__dirname, '../data/products.json');

// Get all orders (admin)
router.get('/orders', verifyAdminToken, (req, res) => {
  try {
    if (!fs.existsSync(ordersFile)) {
      return res.json({ success: true, orders: [] });
    }
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    res.json({
      success: true,
      orders: orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin)
router.put('/orders/:orderId', verifyAdminToken, (req, res) => {
  try {
    const { status } = req.body;

    if (!fs.existsSync(ordersFile)) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    const orderIndex = orders.findIndex(o => o.id === req.params.orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();
    
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');

    res.json({
      success: true,
      message: 'Order updated',
      order: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats (admin)
router.get('/stats', verifyAdminToken, (req, res) => {
  try {
    const orders = fs.existsSync(ordersFile) ? JSON.parse(fs.readFileSync(ordersFile, 'utf8')) : [];
    const products = fs.existsSync(productsFile) ? JSON.parse(fs.readFileSync(productsFile, 'utf8')) : [];

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        totalProducts: products.length,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
