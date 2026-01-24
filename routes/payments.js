const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyCustomerToken } = require('../middleware/auth');

const paymentsFile = path.join(__dirname, '../data/payments.json');

// Initialize payments file
const initializePayments = () => {
  if (!fs.existsSync(paymentsFile)) {
    fs.writeFileSync(paymentsFile, JSON.stringify([]), 'utf8');
  }
};

// Helper functions
const getPayments = () => {
  initializePayments();
  return JSON.parse(fs.readFileSync(paymentsFile, 'utf8'));
};

const savePayments = (payments) => {
  fs.writeFileSync(paymentsFile, JSON.stringify(payments, null, 2), 'utf8');
};

// Initialize Paystack payment
router.post('/initialize', verifyCustomerToken, (req, res) => {
  try {
    const { email, amount, orderId, orderDetails } = req.body;

    if (!email || !amount || !orderId) {
      return res.status(400).json({ error: 'Email, amount, and orderId required' });
    }

    // Create payment record
    const payment = {
      id: 'PAY-' + Date.now(),
      orderId,
      userId: req.userId,
      email,
      amount,
      status: 'pending',
      createdAt: new Date(),
      paymentReference: null
    };

    const payments = getPayments();
    payments.push(payment);
    savePayments(payments);

    // Return payment details for Paystack
    res.json({
      success: true,
      message: 'Payment initialized',
      payment: {
        id: payment.id,
        email,
        amount,
        orderId,
        reference: payment.id,
        publicKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_your_key' // User will set this
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify/:reference', verifyCustomerToken, (req, res) => {
  try {
    const { reference } = req.params;
    const { orderId } = req.body;

    if (!reference) {
      return res.status(400).json({ error: 'Payment reference required' });
    }

    // In production, verify with Paystack API
    // For now, simulate successful payment
    const payments = getPayments();
    const payment = payments.find(p => p.id === reference);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Update payment status
    payment.status = 'completed';
    payment.paymentReference = reference;
    payment.verifiedAt = new Date();

    savePayments(payments);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      payment: {
        id: payment.id,
        status: 'completed',
        amount: payment.amount,
        orderId: payment.orderId
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment status
router.get('/status/:reference', verifyCustomerToken, (req, res) => {
  try {
    const { reference } = req.params;
    const payments = getPayments();
    const payment = payments.find(p => p.id === reference && p.userId === req.userId);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        createdAt: payment.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
