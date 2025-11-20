// Main Application Logic for Pedidos Express
// Handles product display, cart, checkout, and UI interactions

// State Management
let cart = JSON.parse(localStorage.getItem('pedidosExpressCart')) || [];
let currentUser = JSON.parse(localStorage.getItem('pedidosExpressUser')) || null;
let selectedCategory = null;
let searchQuery = '';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize UI
  updateCartUI();
  updateUserUI();
  renderCategories();
  renderProducts();
  renderOffers();
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup navbar scroll effect
  setupNavbarScroll();
}

// Event Listeners Setup
function setupEventListeners() {
  // Navbar
  document.getElementById('searchBtn').addEventListener('click', openSearchModal);
  document.getElementById('cartBtn').addEventListener('click', openCartModal);
  document.getElementById('userBtn').addEventListener('click', toggleUserDropdown);
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
  document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.href = 'auth.html';
  });
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Search Modal
  document.getElementById('closeSearchModal').addEventListener('click', closeSearchModal);
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  
  // Cart Modal
  document.getElementById('closeCartModal').addEventListener('click', closeCartModal);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
  
  // Checkout Modal
  document.getElementById('closeCheckoutModal').addEventListener('click', closeCheckoutModal);
  document.getElementById('cancelCheckout').addEventListener('click', closeCheckoutModal);
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
  document.getElementById('invoiceRequired').addEventListener('change', toggleInvoiceFields);
  
  // Receipt Modal
  document.getElementById('closeReceiptModal').addEventListener('click', closeReceiptModal);
  document.getElementById('printReceipt').addEventListener('click', printReceipt);
  document.getElementById('downloadReceipt').addEventListener('click', downloadReceipt);
  
  // Payment methods
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => selectPaymentMethod(method.dataset.method));
  });
  
  // Newsletter
  document.getElementById('newsletterBtn').addEventListener('click', handleNewsletter);
  
  // Contact form
  document.getElementById('contactForm').addEventListener('submit', handleContactForm);
  
  // WhatsApp button
  document.getElementById('whatsappBtn').addEventListener('click', openWhatsApp);
  
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
      }
    });
  });
  
  // Mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.add('hidden');
    });
  });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Categories Rendering
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = categories.map(category => {
    const productCount = productsDatabase.filter(p => p.category === category.id).length;
    return `
      <div class="category-card" style="--gradient: ${category.gradient}" onclick="filterByCategory('${category.id}')">
        <div class="category-icon">${category.icon}</div>
        <h3 class="category-name">${category.name}</h3>
        <p class="category-description">${category.description}</p>
        <span class="category-products-count">${productCount} productos</span>
      </div>
    `;
  }).join('');
}

// Products Rendering
function renderProducts(filter = null, search = '') {
  const grid = document.getElementById('productsGrid');
  const noProducts = document.getElementById('noProducts');
  const productsCount = document.getElementById('productsCount');
  const productsDescription = document.getElementById('productsDescription');
  
  let filteredProducts = productsDatabase;
  
  // Apply category filter
  if (filter) {
    filteredProducts = filteredProducts.filter(p => p.category === filter);
    const category = categories.find(c => c.id === filter);
    productsDescription.textContent = `Productos de ${category.name}`;
  } else {
    productsDescription.textContent = 'Descubre nuestra amplia selección de productos para el hogar';
  }
  
  // Apply search filter
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Update count
  if (filteredProducts.length > 0) {
    productsCount.textContent = `${filteredProducts.length} productos encontrados`;
    productsCount.classList.remove('hidden');
    noProducts.classList.add('hidden');
  } else {
    productsCount.classList.add('hidden');
    noProducts.classList.remove('hidden');
    grid.innerHTML = '';
    return;
  }
  
  // Render products
  grid.innerHTML = filteredProducts.map(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    
    return `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-badges">
            ${product.badges.map(badge => `
              <span class="offer-badge ${badge}">
                ${badge === 'destacado' ? '⭐ Destacado' : badge === 'discount' ? `-${product.discount}%` : '🔥 Oferta'}
              </span>
            `).join('')}
          </div>
          <span class="stock-badge">${product.stock} disponibles</span>
          ${quantity === 0 ? `
            <button class="quick-add-btn" onclick="addToCart(${product.id})">
              <i class="fas fa-plus"></i>
            </button>
          ` : `
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity-display">${quantity}</span>
              <button class="quantity-btn" onclick="increaseQuantity(${product.id})">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          `}
        </div>
        <div class="product-info">
          <div class="product-brand">${product.brand}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-rating">
            <div class="rating-stars">
              ${generateStars(product.rating)}
            </div>
            <span class="rating-text">${product.rating}</span>
          </div>
          <div class="product-footer">
            <div class="product-pricing">
              <span class="product-price">Bs ${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `
                <span class="product-original-price">Bs ${product.originalPrice.toFixed(2)}</span>
              ` : ''}
            </div>
            ${quantity === 0 ? `
              <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Agregar
              </button>
            ` : `
              <div class="quantity-controls-footer">
                <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${product.id})">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<i class="fas fa-star star filled"></i>';
    } else if (i === fullStars && hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt star filled"></i>';
    } else {
      stars += '<i class="fas fa-star star"></i>';
    }
  }
  
  return stars;
}

// Offers Rendering
function renderOffers() {
  const grid = document.getElementById('offersGrid');
  grid.innerHTML = specialOffers.map(offer => `
    <div class="product-card" onclick="filterByCategory('${offer.category}')">
      <div class="product-image-container">
        <img src="${offer.image}" alt="${offer.title}" class="product-image">
        <div class="product-badges">
          <span class="offer-badge oferta">${offer.discount} OFF</span>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${offer.title}</h3>
        <p class="product-description">${offer.description}</p>
        <div class="product-footer">
          <div class="product-pricing">
            <span class="product-price">Válido hasta ${new Date(offer.validUntil).toLocaleDateString('es-BO')}</span>
          </div>
          <button class="add-to-cart-btn">Ver Productos</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Category Filter
function filterByCategory(categoryId) {
  selectedCategory = categoryId;
  renderProducts(categoryId, searchQuery);
  scrollToSection('#products');
}

// Scroll to section
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Cart Management
function addToCart(productId) {
  const product = productsDatabase.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++;
    } else {
      showAlert('Stock insuficiente', 'No hay más unidades disponibles', 'warning');
      return;
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock
    });
  }
  
  saveCart();
  updateCartUI();
  renderProducts(selectedCategory, searchQuery);
  showToast('Producto agregado al carrito');
}

function increaseQuantity(productId) {
  const product = productsDatabase.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem && cartItem.quantity < product.stock) {
    cartItem.quantity++;
    saveCart();
    updateCartUI();
    renderProducts(selectedCategory, searchQuery);
  } else {
    showAlert('Stock insuficiente', 'No hay más unidades disponibles', 'warning');
  }
}

function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    saveCart();
    updateCartUI();
    renderProducts(selectedCategory, searchQuery);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
  renderProducts(selectedCategory, searchQuery);
}

function clearCart() {
  Swal.fire({
    title: '¿Vaciar carrito?',
    text: 'Se eliminarán todos los productos del carrito',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f59e0b',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      saveCart();
      updateCartUI();
      renderCartItems();
      renderProducts(selectedCategory, searchQuery);
      showToast('Carrito vaciado');
    }
  });
}

function saveCart() {
  localStorage.setItem('pedidosExpressCart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }
}

// User Management
function updateUserUI() {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    userName.textContent = currentUser.name;
    userEmail.textContent = currentUser.email;
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    userName.textContent = 'Usuario';
    userEmail.textContent = 'usuario@email.com';
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }
}

function logout() {
  Swal.fire({
    title: '¿Cerrar sesión?',
    text: 'Se cerrará tu sesión actual',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#f59e0b',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      currentUser = null;
      localStorage.removeItem('pedidosExpressUser');
      updateUserUI();
      showToast('Sesión cerrada exitosamente');
    }
  });
}

// Modal Management
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('hidden');
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('hidden');
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('searchInput').focus();
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function openCartModal() {
  const modal = document.getElementById('cartModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  renderCartItems();
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showAlert('Carrito vacío', 'Agrega productos antes de proceder', 'info');
    return;
  }
  
  closeCartModal();
  const modal = document.getElementById('checkoutModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  renderCheckoutItems();
  
  // Pre-fill user data if logged in
  if (currentUser) {
    document.getElementById('customerName').value = currentUser.name;
    document.getElementById('customerEmail').value = currentUser.email;
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function openReceiptModal() {
  const modal = document.getElementById('receiptModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Search Functionality
function handleSearch(e) {
  const query = e.target.value;
  searchQuery = query;
  
  const searchResults = document.getElementById('searchResults');
  const searchEmpty = document.getElementById('searchEmpty');
  const searchNoResults = document.getElementById('searchNoResults');
  
  if (query.length < 3) {
    searchResults.classList.add('hidden');
    searchEmpty.classList.remove('hidden');
    searchNoResults.classList.add('hidden');
    return;
  }
  
  const results = productsDatabase.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
  
  if (results.length === 0) {
    searchResults.classList.add('hidden');
    searchEmpty.classList.add('hidden');
    searchNoResults.classList.remove('hidden');
    return;
  }
  
  searchEmpty.classList.add('hidden');
  searchNoResults.classList.add('hidden');
  searchResults.classList.remove('hidden');
  
  searchResults.innerHTML = results.slice(0, 5).map(product => `
    <div class="cart-item" onclick="selectSearchResult(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-price">Bs ${product.price.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
}

function selectSearchResult(productId) {
  closeSearchModal();
  selectedCategory = null;
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  
  // Scroll to product
  setTimeout(() => {
    renderProducts();
    scrollToSection('#products');
  }, 300);
}

// Cart Items Rendering
function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotalAmount = document.getElementById('cartTotalAmount');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.classList.remove('hidden');
    cartFooter.classList.add('hidden');
    return;
  }
  
  cartEmpty.classList.add('hidden');
  cartFooter.classList.remove('hidden');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalAmount.textContent = `Bs ${total.toFixed(2)}`;
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">Bs ${item.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <div class="cart-item-quantity">
            <button class="cart-item-btn" onclick="decreaseQuantity(${item.id})">
              <i class="fas fa-minus"></i>
            </button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="cart-item-btn" onclick="increaseQuantity(${item.id})">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <span class="cart-item-remove" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i> Eliminar
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

// Checkout Items Rendering
function renderCheckoutItems() {
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  checkoutTotalAmount.textContent = `Bs ${total.toFixed(2)}`;
  
  checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-info">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-details">${item.quantity} x Bs ${item.price.toFixed(2)}</div>
      </div>
      <div class="checkout-item-price">Bs ${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');
  
  // Update QR and Tigo amounts
  document.getElementById('qrAmount').textContent = `Total: Bs ${total.toFixed(2)}`;
  document.getElementById('tigoAmount').textContent = `Bs ${total.toFixed(2)}`;
  
  // Generate QR code
  generateQRCode(total);
}

// Payment Method Selection
function selectPaymentMethod(method) {
  // Update active state
  document.querySelectorAll('.payment-method').forEach(m => {
    m.classList.remove('active');
    m.querySelector('.radio-btn').classList.remove('active');
  });
  
  const selectedMethod = document.querySelector(`[data-method="${method}"]`);
  selectedMethod.classList.add('active');
  selectedMethod.querySelector('.radio-btn').classList.add('active');
  
  // Hide all payment info
  document.querySelectorAll('.payment-info').forEach(info => {
    info.classList.add('hidden');
  });
  
  // Show selected payment info
  if (method === 'qr') {
    document.getElementById('qrPayment').classList.remove('hidden');
  } else if (method === 'tigo_money') {
    document.getElementById('tigoPayment').classList.remove('hidden');
  }
}

// Generate QR Code
function generateQRCode(amount) {
  const canvas = document.getElementById('qrCanvas');
  const qrData = `Pedidos Express - Total: Bs ${amount.toFixed(2)} - Cuenta: 76543210`;
  
  QRCode.toCanvas(canvas, qrData, {
    width: 200,
    margin: 2,
    color: {
      dark: '#111827',
      light: '#ffffff'
    }
  });
}

// Toggle Invoice Fields
function toggleInvoiceFields() {
  const invoiceFields = document.getElementById('invoiceFields');
  const invoiceRequired = document.getElementById('invoiceRequired');
  
  if (invoiceRequired.checked) {
    invoiceFields.classList.remove('hidden');
    document.getElementById('customerNIT').required = true;
    document.getElementById('customerBusinessName').required = true;
  } else {
    invoiceFields.classList.add('hidden');
    document.getElementById('customerNIT').required = false;
    document.getElementById('customerBusinessName').required = false;
  }
}

// Handle Checkout
function handleCheckout(e) {
  e.preventDefault();
  
  const confirmBtn = document.getElementById('confirmOrder');
  confirmBtn.classList.add('loading');
  
  // Get form data
  const formData = {
    customer: {
      name: document.getElementById('customerName').value,
      email: document.getElementById('customerEmail').value,
      phone: document.getElementById('customerPhone').value,
      address: document.getElementById('customerAddress').value
    },
    paymentMethod: document.querySelector('.payment-method.active').dataset.method,
    requiresInvoice: document.getElementById('invoiceRequired').checked,
    invoice: document.getElementById('invoiceRequired').checked ? {
      nit: document.getElementById('customerNIT').value,
      businessName: document.getElementById('customerBusinessName').value
    } : null,
    items: cart,
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    orderDate: new Date().toISOString(),
    orderNumber: generateOrderNumber()
  };
  
  // Simulate order processing
  setTimeout(() => {
    confirmBtn.classList.remove('loading');
    closeCheckoutModal();
    
    // Generate receipt
    generateReceipt(formData);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(selectedCategory, searchQuery);
    
    // Show success message
    Swal.fire({
      icon: 'success',
      title: '¡Pedido Confirmado!',
      html: `
        <p>Tu pedido #${formData.orderNumber} ha sido confirmado exitosamente.</p>
        <p>Recibirás una confirmación por WhatsApp al número ${formData.customer.phone}</p>
      `,
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'Ver Comprobante'
    }).then(() => {
      openReceiptModal();
    });
  }, 2000);
}

// Generate Order Number
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PE${year}${month}${day}${random}`;
}

// Generate Receipt
function generateReceipt(orderData) {
  const receiptContent = document.getElementById('receiptContent');
  
  receiptContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 15px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-bottom: 16px;">
        <i class="fas fa-shopping-bag"></i>
      </div>
      <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">Pedidos Express</h2>
      <p style="color: #6b7280;">Tu hogar, nuestro compromiso</p>
    </div>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px;">Información del Pedido</h3>
      <div style="display: grid; gap: 8px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280;">Número de Pedido:</span>
          <strong>#${orderData.orderNumber}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280;">Fecha:</span>
          <strong>${new Date(orderData.orderDate).toLocaleString('es-BO')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280;">Método de Pago:</span>
          <strong>${getPaymentMethodName(orderData.paymentMethod)}</strong>
        </div>
      </div>
    </div>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px;">Datos del Cliente</h3>
      <div style="display: grid; gap: 8px;">
        <div><strong>Nombre:</strong> ${orderData.customer.name}</div>
        <div><strong>Email:</strong> ${orderData.customer.email}</div>
        <div><strong>Teléfono:</strong> ${orderData.customer.phone}</div>
        <div><strong>Dirección:</strong> ${orderData.customer.address}</div>
      </div>
    </div>
    
    ${orderData.requiresInvoice ? `
      <div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #fbbf24;">
        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px;">Datos de Facturación</h3>
        <div style="display: grid; gap: 8px;">
          <div><strong>NIT/CI:</strong> ${orderData.invoice.nit}</div>
          <div><strong>Razón Social:</strong> ${orderData.invoice.businessName}</div>
        </div>
      </div>
    ` : ''}
    
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 12px;">Detalle del Pedido</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <th style="text-align: left; padding: 12px 0; color: #6b7280;">Producto</th>
            <th style="text-align: center; padding: 12px 0; color: #6b7280;">Cant.</th>
            <th style="text-align: right; padding: 12px 0; color: #6b7280;">Precio</th>
            <th style="text-align: right; padding: 12px 0; color: #6b7280;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${orderData.items.map(item => `
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 0;">${item.name}</td>
              <td style="text-align: center; padding: 12px 0;">${item.quantity}</td>
              <td style="text-align: right; padding: 12px 0;">Bs ${item.price.toFixed(2)}</td>
              <td style="text-align: right; padding: 12px 0;">Bs ${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr style="border-top: 2px solid #e5e7eb;">
            <td colspan="3" style="text-align: right; padding: 16px 0; font-size: 1.25rem; font-weight: 700;">Total:</td>
            <td style="text-align: right; padding: 16px 0; font-size: 1.25rem; font-weight: 700; color: #059669;">Bs ${orderData.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #f0f9ff; border-radius: 12px; border: 1px solid #7dd3fc;">
      <p style="color: #0369a1; margin-bottom: 8px;">
        <i class="fas fa-info-circle"></i>
        Recibirás una confirmación por WhatsApp
      </p>
      <p style="color: #075985; font-size: 0.875rem;">
        Tiempo estimado de entrega: 30-45 minutos
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 0.875rem;">
        Pedidos Express - Satélite Norte, Santa Cruz, Bolivia<br>
        Teléfono: +591 76543210 | Email: info@pedidosexpress.com
      </p>
    </div>
  `;
}

function getPaymentMethodName(method) {
  const methods = {
    'whatsapp': 'Pago por WhatsApp',
    'tigo_money': 'Tigo Money',
    'qr': 'Código QR',
    'efectivo': 'Efectivo contra entrega'
  };
  return methods[method] || method;
}

// Print Receipt
function printReceipt() {
  window.print();
}

// Download Receipt
function downloadReceipt() {
  showToast('Función de descarga en desarrollo');
}

// Newsletter
function handleNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  
  if (!email || !email.includes('@')) {
    showAlert('Email inválido', 'Por favor ingresa un email válido', 'error');
    return;
  }
  
  showToast('¡Suscripción exitosa! Recibirás nuestras ofertas');
  document.getElementById('newsletterEmail').value = '';
}

// Contact Form
function handleContactForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;
  
  showAlert(
    '¡Mensaje Enviado!',
    `Gracias ${name}, hemos recibido tu mensaje. Te contactaremos pronto.`,
    'success'
  );
  
  e.target.reset();
}

// WhatsApp
function openWhatsApp() {
  const phone = '59176543210';
  const message = encodeURIComponent('Hola, me gustaría hacer un pedido en Pedidos Express');
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Utility Functions
function showAlert(title, text, icon) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonColor: '#f59e0b'
  });
}

function showToast(message) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) {
    document.getElementById('userDropdown').classList.add('hidden');
  }
});
