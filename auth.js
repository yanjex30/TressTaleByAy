// ===========================
// AUTHENTICATION HELPERS
// ===========================

const API_BASE_URL = 'http://localhost:5000/api';

// Get authentication token
function getAuthToken() {
  return localStorage.getItem('customerToken');
}

// Get current user
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return !!getAuthToken();
}

// Make authenticated API request
async function apiCall(endpoint, options = {}) {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - logout user
        logout();
        throw new Error('Your session has expired. Please login again.');
      }
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Logout user
function logout() {
  localStorage.removeItem('customerToken');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Update auth section in navbar
function updateAuthUI() {
  const authSection = document.getElementById('authSection');
  if (!authSection) return;

  const user = getCurrentUser();
  const token = getAuthToken();

  if (token && user) {
    authSection.innerHTML = `
      <div class="user-menu">
        <button class="user-btn" onclick="toggleUserMenu()">👤 ${user.fullName}</button>
        <div class="user-dropdown" id="userDropdown">
          <a href="my-orders.html" class="dropdown-item">📦 My Orders</a>
          <a href="#" onclick="logout()" class="dropdown-item">🚪 Logout</a>
        </div>
      </div>
    `;
  } else {
    authSection.innerHTML = `<button class="auth-btn" onclick="window.location.href='login.html'">🔐 Login</button>`;
  }
}

// Toggle user dropdown menu
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const userMenu = document.querySelector('.user-menu');
  const dropdown = document.getElementById('userDropdown');
  
  if (userMenu && !userMenu.contains(event.target) && dropdown) {
    dropdown.style.display = 'none';
  }
});

// Sync cart with backend when user logs in
async function syncCartWithBackend() {
  if (!isLoggedIn()) return;

  try {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add local cart items to backend
    for (const item of localCart) {
      await apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity
        })
      });
    }

    // Clear local cart
    localStorage.removeItem('cart');
    updateCartCount();
  } catch (error) {
    console.error('Failed to sync cart:', error);
  }
}

// Update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (!cartCount) return;

  if (isLoggedIn()) {
    // Get from backend
    apiCall('/cart')
      .then(data => {
        const count = data.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
      })
      .catch(() => {
        cartCount.textContent = '0';
      });
  } else {
    // Get from localStorage
    const cart = JSON.parse(localStorage.getItem('tresstaleCart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  updateCartCount();
});

// Add CSS for user menu
const style = document.createElement('style');
style.textContent = `
  .auth-section {
    display: flex;
    align-items: center;
  }

  .auth-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .auth-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .user-menu {
    position: relative;
  }

  .user-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .user-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: none;
    min-width: 150px;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .dropdown-item {
    display: block;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s;
    border-bottom: 1px solid #f0f0f0;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item:hover {
    background: #f5f5f5;
    padding-left: 20px;
  }
`;
document.head.appendChild(style);
