// ===========================
// PAYSTACK PAYMENT HANDLER
// ===========================

const PAYSTACK_PUBLIC_KEY = 'pk_test_your_key'; // Will be set via environment
const API_BASE_URL = 'http://localhost:5000/api'; // Will change for production

// Initialize Paystack payment
async function initializePayment(email, amount, orderId, orderDetails) {
  try {
    const response = await apiCall('/payments/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email,
        amount,
        orderId,
        orderDetails
      })
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Open Paystack payment modal
function openPaystackPayment(paymentData) {
  if (!window.PaystackPop) {
    showError('Paystack library not loaded. Please refresh and try again.');
    return;
  }

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: paymentData.email,
    amount: paymentData.amount * 100, // Convert to kobo
    ref: paymentData.reference,
    onClose: () => {
      console.log('Payment window closed');
      // User closed without paying
    },
    onSuccess: (response) => {
      handlePaymentSuccess(response, paymentData);
    }
  });

  handler.openIframe();
}

// Handle successful payment
async function handlePaymentSuccess(response, paymentData) {
  try {
    // Verify payment with backend
    const verifyResponse = await apiCall(`/payments/verify/${response.reference}`, {
      method: 'POST',
      body: JSON.stringify({
        orderId: paymentData.orderId
      })
    });

    if (verifyResponse.success) {
      showSuccess('Payment successful! Your order has been confirmed.');
      
      // Clear cart and redirect
      setTimeout(() => {
        localStorage.removeItem('tresstaleCart');
        updateCartCount();
        window.location.href = 'my-orders.html';
      }, 2000);
    }
  } catch (error) {
    showError('Payment verification failed: ' + error.message);
  }
}

// Get payment status
async function getPaymentStatus(reference) {
  try {
    return await apiCall(`/payments/status/${reference}`, {
      method: 'GET'
    });
  } catch (error) {
    throw error;
  }
}

// Checkout with Paystack
async function checkoutWithPaystack() {
  try {
    const user = getCurrentUser();
    if (!user) {
      showError('Please login to checkout');
      window.location.href = 'login.html';
      return;
    }

    const cart = JSON.parse(localStorage.getItem('tresstaleCart')) || [];
    if (cart.length === 0) {
      showError('Your cart is empty');
      return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (total <= 0) {
      showError('Invalid order amount');
      return;
    }

    // Initialize payment
    const paymentData = await initializePayment(
      user.email,
      total,
      'ORD-' + Date.now(),
      {
        items: cart,
        customer: user.fullName
      }
    );

    // Open Paystack payment
    openPaystackPayment(paymentData.payment);

  } catch (error) {
    showError('Checkout failed: ' + error.message);
  }
}

// Add Paystack script to page
function loadPaystackScript() {
  if (!document.querySelector('script[src*="paystack"]')) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      console.log('Paystack script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
    };
    document.head.appendChild(script);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPaystackScript();
});

// Export functions
window.PaymentHandler = {
  checkout: checkoutWithPaystack,
  initializePayment,
  getPaymentStatus
};
