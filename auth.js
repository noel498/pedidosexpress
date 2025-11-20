// Authentication Logic for Pedidos Express
// Handles user login and registration

// Demo account credentials
const DEMO_ACCOUNT = {
  email: 'pedidosexpress@gmail.com',
  password: 'Pedidos@123',
  name: 'Usuario'
};

// Initialize auth page
document.addEventListener('DOMContentLoaded', () => {
  initializeAuth();
});

function initializeAuth() {
  // Setup event listeners
  setupAuthEventListeners();
  
  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem('pedidosExpressUser'));
  if (currentUser) {
    // Redirect to home if already logged in
    window.location.href = 'index.html';
  }
}

// Setup Event Listeners
function setupAuthEventListeners() {
  // Tab switching
  document.getElementById('loginTab').addEventListener('click', () => switchTab('login'));
  document.getElementById('registerTab').addEventListener('click', () => switchTab('register'));
  
  // Form submissions
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
  
  // Password validation
  document.getElementById('registerPassword').addEventListener('input', validatePassword);
  document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);
  
  // Demo account button
  const demoBtn = document.querySelector('.demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', fillDemoCredentials);
  }
}

// Switch between login and register tabs
function switchTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (tab === 'login') {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  } else {
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  }
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.nextElementSibling;
  const icon = button.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Fill demo credentials
function fillDemoCredentials() {
  document.getElementById('loginEmail').value = DEMO_ACCOUNT.email;
  document.getElementById('loginPassword').value = DEMO_ACCOUNT.password;
  
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Credenciales de demo cargadas',
    showConfirmButton: false,
    timer: 2000
  });
}

// Handle Login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  // Clear previous errors
  document.getElementById('loginEmailError').textContent = '';
  document.getElementById('loginPasswordError').textContent = '';
  
  // Validate email
  if (!validateEmail(email)) {
    document.getElementById('loginEmailError').textContent = 'Email inválido';
    return;
  }
  
  // Validate password
  if (password.length < 6) {
    document.getElementById('loginPasswordError').textContent = 'Contraseña muy corta';
    return;
  }
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Check demo account
    if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      loginSuccess(DEMO_ACCOUNT.name, email, rememberMe);
      return;
    }
    
    // Check registered users
    const users = JSON.parse(localStorage.getItem('pedidosExpressUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      loginSuccess(user.name, email, rememberMe);
    } else {
      // Login failed
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
      
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Email o contraseña incorrectos',
        confirmButtonColor: '#f59e0b'
      });
    }
  }, 1500);
}

// Login Success
function loginSuccess(name, email, rememberMe) {
  const user = { name, email };
  
  // Save user to localStorage
  localStorage.setItem('pedidosExpressUser', JSON.stringify(user));
  
  // Show success message
  Swal.fire({
    icon: 'success',
    title: '¡Bienvenido!',
    text: `Hola ${name}, has iniciado sesión exitosamente`,
    confirmButtonColor: '#f59e0b',
    timer: 2000,
    timerProgressBar: true
  }).then(() => {
    // Redirect to home
    window.location.href = 'index.html';
  });
}

// Handle Register
function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;
  
  // Clear previous errors
  document.getElementById('registerNameError').textContent = '';
  document.getElementById('registerEmailError').textContent = '';
  document.getElementById('registerPasswordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
  
  // Validate name
  if (name.length < 3) {
    document.getElementById('registerNameError').textContent = 'Nombre muy corto';
    return;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    document.getElementById('registerEmailError').textContent = 'Email inválido';
    return;
  }
  
  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.valid) {
    document.getElementById('registerPasswordError').textContent = passwordValidation.message;
    return;
  }
  
  // Validate password match
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden';
    return;
  }
  
  // Validate terms acceptance
  if (!acceptTerms) {
    Swal.fire({
      icon: 'warning',
      title: 'Términos y condiciones',
      text: 'Debes aceptar los términos y condiciones para continuar',
      confirmButtonColor: '#f59e0b'
    });
    return;
  }
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('pedidosExpressUsers')) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
      
      Swal.fire({
        icon: 'error',
        title: 'Email ya registrado',
        text: 'Este email ya está en uso. Por favor inicia sesión.',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }
    
    // Register new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('pedidosExpressUsers', JSON.stringify(users));
    
    // Auto login
    loginSuccess(name, email, true);
  }, 1500);
}

// Validate Email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate Password Strength
function validatePasswordStrength(password) {
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const allValid = Object.values(requirements).every(v => v);
  
  if (!allValid) {
    const missing = [];
    if (!requirements.length) missing.push('8 caracteres');
    if (!requirements.lowercase) missing.push('una minúscula');
    if (!requirements.uppercase) missing.push('una mayúscula');
    if (!requirements.number) missing.push('un número');
    if (!requirements.symbol) missing.push('un símbolo');
    
    return {
      valid: false,
      message: `Falta: ${missing.join(', ')}`
    };
  }
  
  return { valid: true };
}

// Real-time Password Validation
function validatePassword() {
  const password = document.getElementById('registerPassword').value;
  
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  // Update requirement indicators
  updateRequirement('req-length', requirements.length);
  updateRequirement('req-lowercase', requirements.lowercase);
  updateRequirement('req-uppercase', requirements.uppercase);
  updateRequirement('req-number', requirements.number);
  updateRequirement('req-symbol', requirements.symbol);
}

function updateRequirement(id, valid) {
  const element = document.getElementById(id);
  if (valid) {
    element.classList.add('valid');
  } else {
    element.classList.remove('valid');
  }
}

// Validate Password Match
function validatePasswordMatch() {
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorElement = document.getElementById('confirmPasswordError');
  
  if (confirmPassword.length > 0) {
    if (password !== confirmPassword) {
      errorElement.textContent = 'Las contraseñas no coinciden';
    } else {
      errorElement.textContent = '';
    }
  }
}
