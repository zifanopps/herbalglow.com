// Sample order data
let orders = [];

// DOM Elements
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const ordersSection = document.getElementById('orders-section');
const errorMessage = document.getElementById('error-message');
const ordersTableBody = document.getElementById('orders-table-body');
const logoutBtn = document.getElementById('logout-btn');

// Password for accessing orders
const ACCESS_PASSWORD = "awaisimran990011";

// Load orders from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    // Clear any existing password input
    if (document.getElementById('password')) {
        document.getElementById('password').value = '';
    }
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password');
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === ACCESS_PASSWORD) {
        // Hide login section and show orders section
        loginSection.style.display = 'none';
        ordersSection.style.display = 'block';
        
        // Populate orders table
        populateOrdersTable();
    } else {
        // Show error message
        errorMessage.style.display = 'block';
        
        // Clear password field
        passwordInput.value = '';
    }
});

// Load orders from localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Populate orders table with data
function populateOrdersTable() {
    ordersTableBody.innerHTML = '';
    
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>1</td>
            <td>${order.price}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td><button class="btn delete-btn" data-index="${index}">Delete</button></td>
        `;
        ordersTableBody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteOrder(index);
        });
    });
}

// Delete order
function deleteOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        populateOrdersTable();
    }
}

// Handle logout
logoutBtn.addEventListener('click', function() {
    // Hide orders section and show login section
    ordersSection.style.display = 'none';
    loginSection.style.display = 'block';
    
    // Clear password field
    document.getElementById('password').value = '';
    
    // Hide error message if visible
    errorMessage.style.display = 'none';
});

// Function to save order (called from script.js)
function saveOrder(order) {
    // Load existing orders
    loadOrders();
    
    // Add new order
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
}