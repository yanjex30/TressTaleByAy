// ===========================
// ADMIN AUTHENTICATION
// ===========================

const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

let isAdminLoggedIn = false;
let adminUsername = '';

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        isAdminLoggedIn = true;
        adminUsername = username;
        document.getElementById('adminUsername').textContent = username;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        loadDashboard();
        localStorage.setItem('adminLoggedIn', 'true');
    } else {
        alert('Invalid credentials. Try: admin / admin123');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        isAdminLoggedIn = false;
        localStorage.removeItem('adminLoggedIn');
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}

// ===========================
// TAB MANAGEMENT
// ===========================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    const tabId = tabName === 'orders' ? 'orders-custom-tab' : tabName + '-tab';
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
        tabElement.style.display = 'block';
    }
    
    event.target.classList.add('active');
    
    // Load data for specific tabs
    if (tabName === 'messages') {
        loadMessages();
    } else if (tabName === 'orders') {
        loadOrdersAdmin();
    }
}

// ===========================
// DASHBOARD DATA
// ===========================

function loadDashboard() {
    updateDashboardStats();
    loadAdminProducts();
}

function updateDashboardStats() {
    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    const cart = JSON.parse(localStorage.getItem('tresstaleCart')) || [];

    const totalProducts = products.length;
    const totalWigs = products.filter(p => p.category === 'wigs').length;
    const totalPerfumes = products.filter(p => p.category === 'perfumes').length;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalWigs').textContent = totalWigs;
    document.getElementById('totalPerfumes').textContent = totalPerfumes;
    document.getElementById('cartItems').textContent = cartCount;

    // Calculate analytics
    const avgWigPrice = products
        .filter(p => p.category === 'wigs')
        .reduce((sum, p) => sum + p.price, 0) / totalWigs;
    
    const avgPerfumePrice = products
        .filter(p => p.category === 'perfumes')
        .reduce((sum, p) => sum + p.price, 0) / totalPerfumes;

    document.getElementById('avgWigPrice').textContent = '₦' + Math.round(avgWigPrice).toLocaleString();
    document.getElementById('avgPerfumePrice').textContent = '₦' + Math.round(avgPerfumePrice).toLocaleString();
}

// ===========================
// PRODUCT MANAGEMENT
// ===========================

let currentFilter = 'all';

function loadAdminProducts() {
    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    filterAdminProducts('all');
}

function filterAdminProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    let filtered = products;

    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }

    displayAdminProducts(filtered);
}

function displayAdminProducts(products) {
    const grid = document.getElementById('adminProductsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <div class="admin-product-image">
                <img src="./${product.image}" alt="${product.name}">
            </div>
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p><strong>${product.category}</strong></p>
                <p>${product.description}</p>
                <p class="product-price">₦${product.price.toLocaleString()}</p>
                ${product.badge ? `<p><span style="background: #d4a5a5; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${product.badge}</span></p>` : ''}
            </div>
            <div class="product-actions">
                <button class="action-btn edit-btn" onclick="openEditModal(${product.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ===========================
// ADD PRODUCT
// ===========================

function handleAddProduct(event) {
    event.preventDefault();

    const name = document.getElementById('prodName').value;
    const category = document.getElementById('prodCategory').value;
    const price = parseInt(document.getElementById('prodPrice').value);
    const type = document.getElementById('prodType').value;
    const description = document.getElementById('prodDescription').value;
    const image = document.getElementById('prodImage').value;
    const badge = document.getElementById('prodBadge').value;

    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    const newId = Math.max(...products.map(p => p.id), 0) + 1;

    const newProduct = {
        id: newId,
        name,
        category,
        price,
        type,
        description,
        image,
        badge: badge || undefined
    };

    products.push(newProduct);
    localStorage.setItem('tresstaleProducts', JSON.stringify(products));

    alert('Product added successfully!');
    event.target.reset();
    updateDashboardStats();
    loadAdminProducts();
}

// ===========================
// EDIT PRODUCT
// ===========================

function openEditModal(productId) {
    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('editProductId').value = productId;
        document.getElementById('editName').value = product.name;
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editDescription').value = product.description;
        document.getElementById('editBadge').value = product.badge || '';
        
        document.getElementById('editModal').classList.add('active');
    }
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

function handleEditProduct(event) {
    event.preventDefault();

    const productId = parseInt(document.getElementById('editProductId').value);
    const name = document.getElementById('editName').value;
    const price = parseInt(document.getElementById('editPrice').value);
    const description = document.getElementById('editDescription').value;
    const badge = document.getElementById('editBadge').value;

    const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.badge = badge || undefined;

        localStorage.setItem('tresstaleProducts', JSON.stringify(products));
        alert('Product updated successfully!');
        closeEditModal();
        updateDashboardStats();
        loadAdminProducts();
    }
}

// ===========================
// DELETE PRODUCT
// ===========================

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = JSON.parse(localStorage.getItem('tresstaleProducts')) || getDefaultProducts();
        const filtered = products.filter(p => p.id !== productId);

        localStorage.setItem('tresstaleProducts', JSON.stringify(filtered));
        alert('Product deleted successfully!');
        updateDashboardStats();
        loadAdminProducts();
    }
}

// ===========================
// GET DEFAULT PRODUCTS (from main site)
// ===========================

function getDefaultProducts() {
    return [
        // WIGS - ALL 40 WIGS
        {
            id: 1,
            name: "Silk Lace Wave",
            category: "wigs",
            price: 45000,
            image: "../IMG/wig1.JPG",
            badge: "Best Seller",
            description: "Premium silk lace front wig with natural wave pattern",
            type: "Lace Front"
        },
        {
            id: 2,
            name: "Midnight Curls",
            category: "wigs",
            price: 38000,
            image: "../IMG/wig2.JPG",
            badge: "Sale",
            description: "Deep wave curls with protective cap included",
            type: "Full Wig"
        },
        {
            id: 3,
            name: "Golden Goddess",
            category: "wigs",
            price: 47000,
            image: "../IMG/wig3.JPG",
            description: "Long flowing blonde wig with HD lace closure",
            type: "HD Lace"
        },
        {
            id: 4,
            name: "Brazilian Straight",
            category: "wigs",
            price: 42000,
            image: "../IMG/wig4.JPG",
            description: "100% Brazilian virgin hair, sleek and shiny",
            type: "Straight"
        },
        {
            id: 5,
            name: "Burgundy Bounce",
            category: "wigs",
            price: 40000,
            image: "../IMG/wig5.JPG",
            badge: "Trending",
            description: "Trendy burgundy color with bouncy curls",
            type: "Full Wig"
        },
        {
            id: 6,
            name: "Copper Highlights",
            category: "wigs",
            price: 45000,
            image: "../IMG/wig6.JPG",
            description: "Dark brown with stunning copper highlights",
            type: "Lace Front"
        },
        {
            id: 7,
            name: "Honey Waves",
            category: "wigs",
            price: 41000,
            image: "../IMG/wig7.JPG",
            description: "Beautiful honey-toned waves for a natural look",
            type: "Full Wig"
        },
        {
            id: 8,
            name: "Ebony Elegance",
            category: "wigs",
            price: 44000,
            image: "../IMG/wig8.JPG",
            badge: "New",
            description: "Deep black silky straight wig with HD closure",
            type: "HD Lace"
        },
        {
            id: 9,
            name: "Cherry Waves",
            category: "wigs",
            price: 43000,
            image: "../IMG/wig9.JPG",
            description: "Rich cherry red with beautiful body waves",
            type: "Full Wig"
        },
        {
            id: 10,
            name: "Platinum Blonde",
            category: "wigs",
            price: 48000,
            image: "../IMG/wig10.JPG",
            badge: "Premium",
            description: "Stunning platinum blonde lace front wig",
            type: "Lace Front"
        },
        {
            id: 11,
            name: "Caramel Curls",
            category: "wigs",
            price: 40500,
            image: "../IMG/wig11.JPG",
            description: "Caramel highlights with gorgeous curls",
            type: "Full Wig"
        },
        {
            id: 12,
            name: "Jet Black Straight",
            category: "wigs",
            price: 39000,
            image: "../IMG/wig12.JPG",
            description: "Pure jet black with silky straight texture",
            type: "Straight"
        },
        {
            id: 13,
            name: "Auburn Beauty",
            category: "wigs",
            price: 42500,
            image: "../IMG/wig13.JPG",
            description: "Deep auburn with natural texture",
            type: "Full Wig"
        },
        {
            id: 14,
            name: "Ash Blonde Wave",
            category: "wigs",
            price: 46000,
            image: "../IMG/wig14.JPG",
            badge: "Luxury",
            description: "Ash blonde with premium wave pattern",
            type: "HD Lace"
        },
        {
            id: 15,
            name: "Chocolate Brown",
            category: "wigs",
            price: 38500,
            image: "../IMG/wig15.JPG",
            description: "Rich chocolate brown curly wig",
            type: "Full Wig"
        },
        {
            id: 16,
            name: "Rose Gold",
            category: "wigs",
            price: 49000,
            image: "../IMG/wig16.JPG",
            description: "Trendy rose gold with body waves",
            type: "Lace Front"
        },
        {
            id: 17,
            name: "Black Silky",
            category: "wigs",
            price: 41500,
            image: "../IMG/wig17.JPG",
            description: "Premium black silky straight wig",
            type: "Straight"
        },
        {
            id: 18,
            name: "Honey Blonde Curls",
            category: "wigs",
            price: 44500,
            image: "../IMG/wig18.JPG",
            description: "Honey blonde with bouncy curls",
            type: "Full Wig"
        },
        {
            id: 19,
            name: "Deep Wave Brown",
            category: "wigs",
            price: 43500,
            image: "../IMG/wig19.JPG",
            description: "Brown with deep wave texture",
            type: "Full Wig"
        },
        {
            id: 20,
            name: "Burgundy Wave",
            category: "wigs",
            price: 45500,
            image: "../IMG/wig20.JPG",
            description: "Burgundy with elegant wave pattern",
            type: "Lace Front"
        },
        {
            id: 21,
            name: "Black Curly",
            category: "wigs",
            price: 39500,
            image: "../IMG/wig21.JPG",
            description: "Classic black curly wig",
            type: "Full Wig"
        },
        {
            id: 22,
            name: "Blonde Wave",
            category: "wigs",
            price: 47500,
            image: "../IMG/wig22.JPG",
            description: "Beautiful blonde with soft waves",
            type: "HD Lace"
        },
        {
            id: 23,
            name: "Brown Straight",
            category: "wigs",
            price: 40000,
            image: "../IMG/wig23.JPG",
            description: "Medium brown straight wig",
            type: "Straight"
        },
        {
            id: 24,
            name: "Purple Fantasy",
            category: "wigs",
            price: 50000,
            image: "../IMG/wig24.JPG",
            badge: "Limited",
            description: "Bold purple fantasy wig",
            type: "Full Wig"
        },
        {
            id: 25,
            name: "Sandy Brown",
            category: "wigs",
            price: 42000,
            image: "../IMG/wig25.JPG",
            description: "Sandy brown with natural waves",
            type: "Full Wig"
        },
        {
            id: 26,
            name: "Black Lace Wave",
            category: "wigs",
            price: 46500,
            image: "../IMG/wig26.JPG",
            description: "Black with lace front closure and waves",
            type: "Lace Front"
        },
        {
            id: 27,
            name: "Copper Red",
            category: "wigs",
            price: 44000,
            image: "../IMG/wig27.JPG",
            description: "Striking copper red color",
            type: "Full Wig"
        },
        {
            id: 28,
            name: "Light Brown Curls",
            category: "wigs",
            price: 41000,
            image: "../IMG/wig28.JPG",
            description: "Light brown with curly texture",
            type: "Full Wig"
        },
        {
            id: 29,
            name: "Jet Black Wave",
            category: "wigs",
            price: 45000,
            image: "../IMG/wig29.JPG",
            description: "Pure jet black with wave pattern",
            type: "Lace Front"
        },
        {
            id: 30,
            name: "Warm Brown",
            category: "wigs",
            price: 40500,
            image: "../IMG/wig30.JPG",
            description: "Warm brown with natural texture",
            type: "Full Wig"
        },
        {
            id: 31,
            name: "Blonde Curls",
            category: "wigs",
            price: 48000,
            image: "../IMG/wig31.JPG",
            description: "Golden blonde with curls",
            type: "Full Wig"
        },
        {
            id: 32,
            name: "Black Straight",
            category: "wigs",
            price: 39000,
            image: "../IMG/wig32.JPG",
            description: "Classic black straight wig",
            type: "Straight"
        },
        {
            id: 33,
            name: "Auburn Wave",
            category: "wigs",
            price: 43000,
            image: "../IMG/wig33.JPG",
            description: "Auburn with beautiful wave texture",
            type: "Full Wig"
        },
        {
            id: 34,
            name: "Ash Blonde Straight",
            category: "wigs",
            price: 44500,
            image: "../IMG/wig34.JPG",
            description: "Ash blonde straight wig",
            type: "Lace Front"
        },
        {
            id: 35,
            name: "Dark Brown Curly",
            category: "wigs",
            price: 40500,
            image: "../IMG/wig35.JPG",
            description: "Dark brown with curly pattern",
            type: "Full Wig"
        },
        {
            id: 36,
            name: "Honey Straight",
            category: "wigs",
            price: 42000,
            image: "../IMG/wig36.JPG",
            description: "Honey toned straight wig",
            type: "Straight"
        },
        {
            id: 37,
            name: "Black Curly Premium",
            category: "wigs",
            price: 51000,
            image: "../IMG/wig37.JPG",
            badge: "Premium",
            description: "Premium black curly wig with HD lace",
            type: "HD Lace"
        },
        {
            id: 38,
            name: "Brown Wave",
            category: "wigs",
            price: 43500,
            image: "../IMG/wig38.JPG",
            description: "Brown with elegant wave pattern",
            type: "Full Wig"
        },
        {
            id: 39,
            name: "Blonde Straight",
            category: "wigs",
            price: 47000,
            image: "../IMG/wig39.JPG",
            description: "Blonde straight wig",
            type: "Straight"
        },
        {
            id: 40,
            name: "Black Waves Premium",
            category: "wigs",
            price: 50000,
            image: "../IMG/wig40.JPG",
            description: "Premium black waves with lace closure",
            type: "Lace Front"
        },

        // PERFUMES - ALL PERFUME IMAGES
        {
            id: 41,
            name: "Enchanted Rose",
            category: "perfumes",
            price: 30000,
            image: "../IMG/0808d7df-8803-4949-a19f-1ea06b01c38c.JPG",
            badge: "Luxury",
            description: "Floral fragrance with rose and jasmine notes",
            type: "Eau de Parfum"
        },
        {
            id: 42,
            name: "Midnight Musk",
            category: "perfumes",
            price: 28000,
            image: "../IMG/1a5cada0-053b-4320-9840-f6d38f470751.JPG",
            badge: "Best Seller",
            description: "Deep musk with amber and sandalwood undertones",
            type: "Eau de Parfum"
        },
        {
            id: 43,
            name: "Ocean Breeze",
            category: "perfumes",
            price: 23000,
            image: "../IMG/4c10fea1-6b66-42b1-9df1-62a1e666ad31.JPG",
            description: "Fresh aquatic fragrance perfect for daily wear",
            type: "Eau de Toilette"
        },
        {
            id: 44,
            name: "Amber Dreams",
            category: "perfumes",
            price: 32000,
            image: "../IMG/635725f7-8c11-4006-b19a-c126c4068fbf.JPG",
            badge: "Limited",
            description: "Warm amber with vanilla and cedar wood",
            type: "Eau de Parfum"
        },
        {
            id: 45,
            name: "Citrus Sunrise",
            category: "perfumes",
            price: 25000,
            image: "../IMG/6dec266f-83d1-4a94-ad54-e86321f27c16.JPG",
            description: "Energizing blend of citrus fruits and bergamot",
            type: "Eau de Toilette"
        },
        {
            id: 46,
            name: "Velvet Nights",
            category: "perfumes",
            price: 35000,
            image: "../IMG/6e749c4e-d8cf-410b-80b7-38a274c25980.JPG",
            badge: "Bestseller",
            description: "Sophisticated floral with dark berry notes",
            type: "Eau de Parfum"
        },
        {
            id: 47,
            name: "Lavender Bliss",
            category: "perfumes",
            price: 26000,
            image: "../IMG/6f1f49d1-9f6e-4576-be17-507af57abc19.JPG",
            description: "Calming lavender with white tea notes",
            type: "Eau de Toilette"
        },
        {
            id: 48,
            name: "Exotic Paradise",
            category: "perfumes",
            price: 37000,
            image: "../IMG/871ffb98-efa9-4911-920d-f3e5cb32dc60.JPG",
            description: "Tropical blend with coconut and mango essence",
            type: "Eau de Parfum"
        },
        {
            id: 49,
            name: "Forest Green",
            category: "perfumes",
            price: 29000,
            image: "../IMG/89053cc2-2009-459d-b0fd-6f32365333bb.JPG",
            description: "Fresh forest notes with green tea",
            type: "Eau de Toilette"
        },
        {
            id: 50,
            name: "Rose Garden",
            category: "perfumes",
            price: 31000,
            image: "../IMG/8c6c8a6f-f583-49a3-9b76-555f12cdf91c.JPG",
            description: "Pure rose petals with subtle floral notes",
            type: "Eau de Parfum"
        },
        {
            id: 51,
            name: "Spice Market",
            category: "perfumes",
            price: 27000,
            image: "../IMG/94ecedad-1dc0-443d-acdd-3544152402ce.JPG",
            badge: "Trending",
            description: "Exotic spices with warm vanilla base",
            type: "Eau de Toilette"
        },
        {
            id: 52,
            name: "Pearl White",
            category: "perfumes",
            price: 33000,
            image: "../IMG/b0968d3f-8d5b-4db9-b6a9-dd3eb7deb99c.JPG",
            description: "Clean white musk with pearlescent notes",
            type: "Eau de Parfum"
        },
        {
            id: 53,
            name: "Midnight Garden",
            category: "perfumes",
            price: 34000,
            image: "../IMG/b77eba40-3399-40e6-9a0f-6ae487f1e062.JPG",
            badge: "New",
            description: "Night blooming flowers with dark amber",
            type: "Eau de Parfum"
        },
        {
            id: 54,
            name: "Vanilla Sky",
            category: "perfumes",
            price: 24000,
            image: "../IMG/e099395b-0bbf-4121-928e-b9cf0185990a.JPG",
            description: "Sweet vanilla with sky musk",
            type: "Eau de Toilette"
        },
        {
            id: 55,
            name: "Oud Elegance",
            category: "perfumes",
            price: 42000,
            image: "../IMG/e4ad99ed-97d9-4797-8d07-258148aa7d6b.JPG",
            badge: "Luxury",
            description: "Premium oud with precious woods",
            type: "Eau de Parfum"
        },
        {
            id: 56,
            name: "Petal Whisper",
            category: "perfumes",
            price: 28500,
            image: "../IMG/f9143803-f935-4f70-9f76-8f66224d5156.JPG",
            description: "Delicate petals with soft musk",
            type: "Eau de Toilette"
        },
        {
            id: 57,
            name: "Golden Hour",
            category: "perfumes",
            price: 36000,
            image: "../IMG/fb7c4c7b-5c17-4993-9819-a4fd29143560.JPG",
            description: "Golden amber with sunset warmth",
            type: "Eau de Parfum"
        },
        {
            id: 58,
            name: "Crystal Clear",
            category: "perfumes",
            price: 22000,
            image: "../IMG/fdd0d2bc-1bbc-4533-95b6-a1d98e30c779.JPG",
            description: "Fresh and crisp with crystal notes",
            type: "Eau de Toilette"
        }
    ];
}

// ===========================
// INITIALIZATION
// ===========================

window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        isAdminLoggedIn = true;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        loadDashboard();
    }

// ===========================
// MESSAGES AND ORDERS MANAGEMENT
// ===========================

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const messagesList = document.getElementById('messagesList');

    if (messages.length === 0) {
        messagesList.innerHTML = '<p class="no-data">No messages yet</p>';
        return;
    }

    messagesList.innerHTML = messages.map((msg, idx) => `
        <div class="message-item" style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #d4a5a5;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #2c2c2c;">${msg.name}</h4>
                    <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">📧 ${msg.email}</p>
                    <p style="margin: 10px 0; color: #555; line-height: 1.5;">${msg.message}</p>
                    <p style="margin: 0; color: #999; font-size: 12px;">📅 ${msg.date}</p>
                </div>
                <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: ${msg.status === 'unread' ? '#ffe0e0' : '#e0f0e0'}; color: ${msg.status === 'unread' ? '#d4a5a5' : '#4a7c4e'};">${msg.status.toUpperCase()}</span>
            </div>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button onclick="markMessageRead(${idx})" style="padding: 6px 12px; background: #d4a5a5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Mark Read</button>
                <button onclick="deleteMessageAdmin(${idx})" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadOrdersAdmin() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersList = document.getElementById('ordersCustomList');

    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-data">No orders yet</p>';
        return;
    }

    ordersList.innerHTML = orders.map((order, idx) => `
        <div class="order-item" style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #d4a5a5;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #2c2c2c;">${order.id}</h4>
                    <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">💰 Total: ₦${order.total.toLocaleString()}</p>
                    <p style="margin: 0 0 10px 0; color: #999; font-size: 12px;">📅 ${order.date}</p>
                    <div style="background: white; padding: 10px; border-radius: 4px; margin: 10px 0; font-size: 12px;">
                        <strong>Items (${order.items.length}):</strong>
                        <div style="margin-top: 8px;">
                            ${order.items.map(item => `
                                <div style="color: #666; margin: 4px 0;">• ${item.name} × ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: ${order.status === 'completed' ? '#e0f0e0' : '#fff0e0'}; color: ${order.status === 'completed' ? '#4a7c4e' : '#d9a000'};">${order.status.toUpperCase()}</span>
            </div>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button onclick="markOrderCompletedAdmin(${idx})" style="padding: 6px 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Mark Complete</button>
                <button onclick="deleteOrderAdmin(${idx})" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function markMessageRead(idx) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages[idx].status = 'read';
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages();
}

function deleteMessageAdmin(idx) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.splice(idx, 1);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadMessages();
    }
}

function markOrderCompletedAdmin(idx) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders[idx].status = 'completed';
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrdersAdmin();
}

function deleteOrderAdmin(idx) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.splice(idx, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrdersAdmin();
    }
}

    // Initialize products in localStorage if not exists
    if (!localStorage.getItem('tresstaleProducts')) {
        localStorage.setItem('tresstaleProducts', JSON.stringify(getDefaultProducts()));
    }
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
});