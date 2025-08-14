// Shopping cart functionality
let cart = [];
let currentProduct = {};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Buy Now buttons
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const deliveryModal = document.getElementById('delivery-modal');
    const closeModal = document.querySelector('.close');
    const deliveryForm = document.getElementById('delivery-form');
    
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Store current product info
            currentProduct.name = productName;
            currentProduct.price = productPrice;
            
            // Show delivery form
            showDeliveryForm(productName, productPrice);
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            deliveryModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deliveryModal) {
            deliveryModal.style.display = 'none';
        }
    });
    
    // Handle delivery form submission
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
    
    // Update cart count on page load
    updateCartCount();
    
    // Convert prices to PKR on page load
    convertPricesToPKR();
});

// Show delivery form modal
function showDeliveryForm(productName, productPrice) {
    const deliveryModal = document.getElementById('delivery-modal');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    
    if (deliveryModal && productNameInput && productPriceInput) {
        // Convert price to PKR (assuming 1 USD = 275 PKR)
        const priceInPKR = convertToPKR(productPrice);
        
        productNameInput.value = productName;
        productPriceInput.value = priceInPKR;
        deliveryModal.style.display = 'block';
    }
}

// Convert USD to PKR
function convertToPKR(priceString) {
    // Extract numeric value from price string (e.g., "$24.99" -> 24.99)
    const priceValue = parseFloat(priceString.replace('$', ''));
    
    // Convert to PKR (assuming 1 USD = 280 PKR)
    const pkrValue = priceValue * 280;
    
    // Format as PKR currency
    return '₨ ' + pkrValue.toLocaleString('en-PK');
}

// Convert all prices on the page to PKR
function convertPricesToPKR() {
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(element => {
        const priceString = element.textContent;
        const pkrPrice = convertToPKR(priceString);
        element.textContent = pkrPrice;
    });
}

// Submit order
function submitOrder() {
    // Get form data
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const deliveryAddress = document.getElementById('delivery-address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    
    // Create order object
    const order = {
        id: 'ORD-' + Date.now(),
        customer: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: deliveryAddress,
        city: city,
        postalCode: postalCode,
        paymentMethod: paymentMethod,
        product: productName,
        price: productPrice,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing'
    };
    
    // Save order to localStorage
    saveOrder(order);
    
    // Close modal
    document.getElementById('delivery-modal').style.display = 'none';
    
    // Show confirmation
    alert(`Thank you for your order, ${customerName}! Your order ID is ${order.id}. We'll contact you soon.`);
    
    // Reset form
    document.getElementById('delivery-form').reset();
}

// Function to save order (called from orders.js)
function saveOrder(order) {
    // Load existing orders
    let orders = [];
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
    
    // Add new order
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Add item to cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });
    
    // Update cart count
    updateCartCount();
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Initialize cart on page load
loadCart();