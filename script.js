// ===========================
// PRODUCT DATA
// ===========================

let products = [
    // WIGS - ALL 40 WIGS
    {
        id: 1,
        name: "Wine Wave",
        category: "wigs",
        price: 45000,
        image: "./IMG/wig1.JPG",
        badge: "Best Seller",
        description: "Premium wine front wig with natural wave pattern",
        type: "Lace Front"
    },
    {
        id: 2,
        name: "Midnight Curls",
        category: "wigs",
        price: 38000,
        image: "./IMG/wig2.JPG",
        badge: "Sale",
        description: "Deep wave curls with protective cap included",
        type: "Full Wig"
    },
    {
        id: 3,
        name: "Curled wig",
        category: "wigs",
        price: 47000,
        image: "./IMG/wig3.JPG",
        description: "Perfect curled wig",
        type: "HD Lace"
    },
    {
        id: 4,
        name: "Full closure affordable human hair bob ",
        category: "wigs",
        price: 38000,
        image: "./IMG/wig4.JPG",
        description: "Full closure affordable human hair bob ",
        type: "Straight"
    },
    {
        id: 5,
        name: "T frontal human hair blend ocean body wave unit 30 inches",
        category: "wigs",
        price: 46000,
        image: "./IMG/wig5.JPG",
        badge: "Trending",
        description: "T frontal human hair blend ocean body wave unit 30 inches",
        type: "Full Wig"
    },
    {
        id: 6,
        name: "Long twist wig",
        category: "wigs",
        price: 45000,
        image: "./IMG/wig6.JPG",
        description: "Dark wig with stunning twist",
        type: "Lace Front"
    },
    {
        id: 7,
        name: "black wig",
        category: "wigs",
        price: 41000,
        image: "./IMG/wig7.JPG",
        description: "Beautiful wig for a natural look",
        type: "Full Wig"
    },
    {
        id: 8,
        name: "Wine Elegance wig",
        category: "wigs",
        price: 44000,
        image: "./IMG/wig8.JPG",
        badge: "New",
        description: "Wine straight wig with HD closure",
        type: "HD Lace"
    },
    {
        id: 9,
        name: "Cherry Waves",
        category: "wigs",
        price: 43000,
        image: "./IMG/wig9.JPG",
        description: "Rich cherry red with beautiful body waves",
        type: "Full Wig"
    },
    {
        id: 10,
        name: "Full frontal Wig Chioma human hair ",
        category: "wigs",
        price: 45000,
        image: "./IMG/wig10.JPG",
        badge: "Premium",
        description: "Full frontal Wig Chioma human hair ",
        type: "Lace Front"
    },
    {
        id: 12,
        name: "Full Frontal Tiwa Human Hair",
        category: "wigs",
        price: 40000,
        image: "./IMG/wig12.JPG",
        description: "Full Frontal Tiwa Human Hair",
        type: "Straight"
    },
    {
        id: 13,
        name: "Auburn Beauty",
        category: "wigs",
        price: 42500,
        image: "./IMG/wig13.JPG",
        description: "Deep auburn with natural texture",
        type: "Full Wig"
    },
    {
        id: 14,
        name: "Full frontal human hair ",
        category: "wigs",
        price: 50000,
        image: "./IMG/wig14.JPG",
        badge: "Luxury",
        description: "Full frontal human hair ",
        type: "HD Lace"
    },
    {
        id: 15,
        name: "Chocolate Brown",
        category: "wigs",
        price: 38500,
        image: "./IMG/wig15.JPG",
        description: "Rich chocolate brown curly wig",
        type: "Full Wig"
    },
   
    {
        id: 17,
        name: "Black twist",
        category: "wigs",
        price: 41500,
        image: "./IMG/wig17.JPG",
        description: "Premium black twist wig",
        type: "Straight"
    },
    {
        id: 18,
        name: "Black Curls",
        category: "wigs",
        price: 44500,
        image: "./IMG/wig18.JPG",
        description: "black with bouncy curls",
        type: "Full Wig"
    },
    {
        id: 19,
        name: "Deep Wave Brown",
        category: "wigs",
        price: 43500,
        image: "./IMG/wig19.JPG",
        description: "Brown with deep wave texture",
        type: "Full Wig"
    },
    {
        id: 20,
        name: "Fringe budget pixie curls hair blend ",
        category: "wigs",
        price: 30000,
        image: "./IMG/wig20.JPG",
        description: "Fringe budget pixie curls hair blend ",
        type: "Lace Front"
    },
    {
        id: 21,
        name: "Darkroot/wine closure blunt cut human hair blend",
        category: "wigs",
        price: 28000,
        image: "./IMG/wig21.JPG",
        description: "Darkroot/wine closure blunt cut human hair blend",
        type: "Full Wig"
    },
    {
        id: 22,
        name: "Black straight wig",
        category: "wigs",
        price: 47500,
        image: "./IMG/wig22.JPG",
        description: "Beautiful black with soft waves",
        type: "HD Lace"
    },
    {
        id: 23,
        name: "Pure Human hair Bob 4by4 Closure 4/350/4",
        category: "wigs",
        price: 52000,
        image: "./IMG/wig23.JPG",
        description: "Medium brown straight wig",
        type: "Straight"
    },
    {
        id: 25,
        name: "Black curls",
        category: "wigs",
        price: 42000,
        image: "./IMG/wig25.JPG",
        description: "Deep black with natural waves",
        type: "Full Wig"
    },
    {
        id: 26,
        name: "13x4 full frontal pixie curls 💯Human hair NC",
        category: "wigs",
        price: 245000,
        image: "./IMG/wig26.JPG",
        description: "13x4 full frontal pixie curls 💯Human hair NC",
        type: "Lace Front"
    },
    {
        id: 27,
        name: "Black straight wig",
        category: "wigs",
        price: 44000,
        image: "./IMG/wig27.JPG",
        description: "Deep black color",
        type: "Full Wig"
    },
    {
        id: 28,
        name: "Full frontal Wig Tiwa human hair ",
        category: "wigs",
        price: 38000,
        image: "./IMG/wig28.JPG",
        description: "Full frontal Wig Tiwa human hair ",
        type: "Full Wig"
    },
    {
        id: 29,
        name: "Jet Black Wave",
        category: "wigs",
        price: 45000,
        image: "./IMG/wig29.JPG",
        description: "Pure jet black with wave pattern",
        type: "Lace Front"
    },
    {
        id: 30,
        name: "Warm Black",
        category: "wigs",
        price: 40500,
        image: "./IMG/wig30.JPG",
        description: "Warm black with natural texture",
        type: "Full Wig"
    },
    {
        id: 32,
        name: "5by5 closure hair blend ",
        category: "wigs",
        price: 55000,
        image: "./IMG/wig32.JPG",
        description: "5by5 closure hair blend ",
        type: "Straight"
    },
    {
        id: 33,
        name: "SDD 5by5 closure human hair pixie curls 16",
        category: "wigs",
        price: 150000,
        image: "./IMG/wig33.JPG",
        description: "SDD 5by5 closure human hair pixie curls 16",
        type: "Full Wig"
    },
    {
        id: 34,
        name: "Ash Blonde Straight",
        category: "wigs",
        price: 44500,
        image: "./IMG/wig34.JPG",
        description: "Ash blonde straight wig",
        type: "Lace Front"
    },
    {
        id: 35,
        name: "Dark Brown Curly",
        category: "wigs",
        price: 40500,
        image: "./IMG/wig35.JPG",
        description: "Dark brown with curly pattern",
        type: "Full Wig"
    },
    {
        id: 36,
        name: "2by4 Sdd Vietnamese bonestraight 10” 130k for bundles",
        category: "wigs",
        price: 42000,
        image: "./IMG/wig36.JPG",
        description: "2by4 Sdd Vietnamese bonestraight 10” 130k for bundles",
        type: "Straight"
    },
    {
        id: 37,
        name: "Black Curly Premium",
        category: "wigs",
        price: 51000,
        image: "./IMG/wig37.JPG",
        badge: "Premium",
        description: "Premium black curly wig with HD lace",
        type: "HD Lace"
    },
    {
        id: 38,
        name: "Band wig human hair blend ",
        category: "wigs",
        price: 32000,
        image: "./IMG/wig38.JPG",
        description: "Band wig human hair blend ",
        type: "Full Wig"
    },
    {
        id: 39,
        name: "Full frontal spiral bounce body wave unit 28” inches human hair blend",
        category: "wigs",
        price: 58000,
        image: "./IMG/wig39.JPG",
        description: "Full frontal spiral bounce body wave unit 28” inches human hair blend",
        type: "Straight"
    },

    // PERFUMES - ALL PERFUME IMAGES
    {
        id: 41,
        name: "BADE'E AL OUD",
        category: "perfumes",
        price: 30000,
        image: "./IMG/0808d7df-8803-4949-a19f-1ea06b01c38c.JPG",
        badge: "Luxury",
        description: "BADE'E AL OUD",
        type: "Eau de Parfum"
    },
    {
        id: 42,
        name: "AZZARO THE MOST WANTED",
        category: "perfumes",
        price: 28000,
        image: "./IMG/1a5cada0-053b-4320-9840-f6d38f470751.JPG",
        badge: "Best Seller",
        description: "AZZARO THE MOST WANTED",
        type: "Eau de Parfum"
    },
    {
        id: 43,
        name: "MUSAMAM",
        category: "perfumes",
        price: 23000,
        image: "./IMG/4c10fea1-6b66-42b1-9df1-62a1e666ad31.JPG",
        description: "MUSAMAM",
        type: "Eau de Parfum"
    },
    {
        id: 44,
        name: "Amber Dreams",
        category: "perfumes",
        price: 32000,
        image: "./IMG/635725f7-8c11-4006-b19a-c126c4068fbf.JPG",
        badge: "Limited",
        description: "Amber Dreams",
        type: "Eau de Parfum"
    },
    {
        id: 45,
        name: "AVENTUS BLACK",
        category: "perfumes",
        price: 25000,
        image: "./IMG/6dec266f-83d1-4a94-ad54-e86321f27c16.JPG",
        description: "AVENTUS BLACK",
        type: "Eau de Parfum"
    },
    {
        id: 46,
        name: "KALY",
        category: "perfumes",
        price: 35000,
        image: "./IMG/6e749c4e-d8cf-410b-80b7-38a274c25980.JPG",
        badge: "Bestseller",
        description: "KALY",
        type: "Eau de Parfum"
    },
    {
        id: 47,
        name: "PISTACHIO",
        category: "perfumes",
        price: 26000,
        image: "./IMG/6f1f49d1-9f6e-4576-be17-507af57abc19.JPG",
        description: "PISTACHIO",
        type: "Eau de Parfum"
    },
    {
        id: 48,
        name: "BLACK ASAD",
        category: "perfumes",
        price: 37000,
        image: "./IMG/871ffb98-efa9-4911-920d-f3e5cb32dc60.JPG",
        description: "BLACK ASAD",
        type: "Eau de Parfum"
    },
    {
        id: 49,
        name: "SMART COLLECTION",
        category: "perfumes",
        price: 29000,
        image: "./IMG/89053cc2-2009-459d-b0fd-6f32365333bb.JPG",
        description: "SMART COLLECTION",
        type: "Eau de Parfum"
    },
    {
        id: 50,
        name: "OFFICIAL CRYSTAL ONLY YOU",
        category: "perfumes",
        price: 31000,
        image: "./IMG/8c6c8a6f-f583-49a3-9b76-555f12cdf91c.JPG",
        description: "OFFICIAL CRYSTAL ONLY YOU",
        type: "Eau de Parfum"
    },
    {
        id: 51,
        name: "OFFICIAL CRYSTAL FLORIANA",
        category: "perfumes",
        price: 27000,
        image: "./IMG/94ecedad-1dc0-443d-acdd-3544152402ce.JPG",
        badge: "Trending",
        description: "OFFICIAL CRYSTAL FLORIANA",
        type: "Eau de Parfum"
    },
    {
        id: 52,
        name: "MYSTICAL",
        category: "perfumes",
        price: 33000,
        image: "./IMG/b0968d3f-8d5b-4db9-b6a9-dd3eb7deb99c.JPG",
        description: "MYSTICAL",
        type: "Eau de Parfum"
    },
    {
        id: 53,
        name: "MONOGOTASFRESA",
        category: "perfumes",
        price: 34000,
        image: "./IMG/b77eba40-3399-40e6-9a0f-6ae487f1e062.JPG",
        badge: "New",
        description: "MONOGOTASFRESA",
        type: "Eau de Parfum"
    },
    {
        id: 54,
        name: "BOMB SHELL",
        category: "perfumes",
        price: 24000,
        image: "./IMG/e099395b-0bbf-4121-928e-b9cf0185990a.JPG",
        description: "BOMB SHELL",
        type: "Eau de Parfum"
    },
    {
        id: 55,
        name: "ECLAIRE",
        category: "perfumes",
        price: 42000,
        image: "./IMG/e4ad99ed-97d9-4797-8d07-258148aa7d6b.JPG",
        badge: "Luxury",
        description: "ECLAIRE",
        type: "Eau de Parfum"
    },
    {
        id: 56,
        name: "KHAMRAH",
        category: "perfumes",
        price: 28500,
        image: "./IMG/f9143803-f935-4f70-9f76-8f66224d5156.JPG",
        description: "KHAMRAH",
        type: "Eau de Parfum"
    },
    {
        id: 57,
        name: "24K",
        category: "perfumes",
        price: 36000,
        image: "./IMG/fb7c4c7b-5c17-4993-9819-a4fd29143560.JPG",
        description: "24K",
        type: "Eau de Parfum"
    },
    {
        id: 58,
        name: "BADE'E AL OUD",
        category: "perfumes",
        price: 22000,
        image: "./IMG/fdd0d2bc-1bbc-4533-95b6-a1d98e30c779.JPG",
        description: "BADE'E AL OUD",
        type: "Eau de Parfum"
    }
];

// ===========================
// CART MANAGEMENT
// ===========================

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    try {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    } catch (err) {
        console.error('Error removing from cart:', err);
        alert('Error removing item from cart.');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>₦${item.price.toLocaleString()} each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    try {
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters.');
            return;
        }
        
        // Save contact message to localStorage
        const contactMessage = {
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toLocaleString(),
            status: 'unread'
        };
        
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(contactMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Show success message
        alert(`Thank you for reaching out, ${name}!\\n\\nWe've received your message and will get back to you as soon as possible.\\n\\nEmail: ${email}`);
        
        // Reset form
        event.target.reset();
    } catch (err) {
        console.error('Error submitting contact form:', err);
        alert('Error submitting form. Please try again.');
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (message.length < 10) {
        alert('Please enter a message with at least 10 characters.');
        return;
    }
    
    // Save contact message to localStorage
    const contactMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toLocaleString(),
        status: 'unread'
    };
    
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    alert(`Thank you for reaching out, ${name}!\n\nWe've received your message and will get back to you as soon as possible.\n\nEmail: ${email}`);
    
    // Reset form
    event.target.reset();
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order data
    const order = {
        id: 'ORD-' + Date.now(),
        items: cart,
        total: total,
        date: new Date().toLocaleString(),
        status: 'pending'
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert(`Thank you for your purchase!\n\nOrder ID: ${order.id}\nTotal: ₦${total.toLocaleString()}\n\nYour order has been placed successfully. You will receive a confirmation email shortly.`);
    
    cart = [];
    updateCartUI();
    toggleCart();
}

// ===========================
// PRODUCT DISPLAY & FILTERING
// ===========================

let filteredProducts = [...products];
let currentFilter = 'all';

function displayProducts(productsToDisplay) {
    try {
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) {
            console.warn('Products grid element not found');
            return;
        }
        
        if (productsToDisplay.length === 0) {
            productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No products found. Try adjusting your filters.</p>';
            return;
        }

        productsGrid.innerHTML = productsToDisplay.map(product => {
            try {
                return `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='./IMG/placeholder.png'">
                            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        </div>
                        <div class="product-details">
                            <p class="product-category">${product.category}</p>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-footer">
                                <span class="product-price">₦${product.price.toLocaleString()}</span>
                                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
            } catch (err) {
                console.error('Error rendering product:', product, err);
                return '<div class="product-card"><p>Error loading product</p></div>';
            }
        }).join('');
    } catch (err) {
        console.error('Error displaying products:', err);
    }
}

function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }

    sortProducts(document.getElementById('sortSelect').value);
}

function sortProducts(sortBy) {
    let sorted = [...filteredProducts];

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            sorted = filteredProducts;
            break;
    }

    displayProducts(sorted);
}

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return; // Exit if search input doesn't exist
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            filteredProducts = currentFilter === 'all' 
                ? [...products] 
                : products.filter(p => p.category === currentFilter);
        } else {
            const baseProducts = currentFilter === 'all' 
                ? [...products] 
                : products.filter(p => p.category === currentFilter);
            
            filteredProducts = baseProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.type.toLowerCase().includes(searchTerm)
            );
        }
        
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortProducts(sortSelect.value);
        }
    });
}

// ===========================
// UTILITIES
// ===========================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #d4a5a5;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function handleNavigation(e) {
    if (e.target.classList.contains('nav-link')) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
    }
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Always use the latest products data and save to localStorage
    localStorage.setItem('tresstaleProducts', JSON.stringify(products));

    // Only display initial products if we're on home or a page that needs immediate display
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid && !productsGrid.innerHTML.trim()) {
        displayProducts(products);
    }
    
    // Setup search if search input exists
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        setupSearch();
    }
    
    // Setup navigation if nav menu exists
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.addEventListener('click', handleNavigation);
    }

    // Add animation styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add admin link
    const adminLink = document.createElement('a');
    adminLink.href = './admin.html';
    adminLink.textContent = '⚙️ Admin';
    adminLink.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #d4a5a5; color: white; padding: 10px 15px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600; z-index: 999; transition: all 0.3s ease;';
    adminLink.onmouseover = () => adminLink.style.background = '#c28585';
    adminLink.onmouseout = () => adminLink.style.background = '#d4a5a5';
    document.body.appendChild(adminLink);

    // Demo: Load cart from localStorage if exists
    const savedCart = localStorage.getItem('tresstaleCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
});

// Save cart to localStorage on changes
window.addEventListener('beforeunload', () => {
    localStorage.setItem('tresstaleCart', JSON.stringify(cart));
});