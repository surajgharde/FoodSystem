
// Global variables
let orderItems = [];

// Function to open tab
function openTab(tabId) {
    // Hide all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Deactivate all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Activate the clicked button
    const activeButton = document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`);
    activeButton.classList.add('active');
}

// Function to process order
function processOrder() {
    // Clear previous order
    orderItems = [];
    
    // Get all menu items with quantity > 0
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    quantityInputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const id = input.getAttribute('data-id');
            const name = input.getAttribute('data-name');
            const price = parseFloat(input.getAttribute('data-price'));
            
            orderItems.push({
                id: id,
                name: name,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
        }
    });
    
    // If no items selected
    if (orderItems.length === 0) {
        alert('Please select at least one item to place an order.');
        return;
    }
    
    // Generate bill
    generateBill();
    
    // Switch to bill tab
    openTab('bill-tab');
}

// Function to generate bill
function generateBill() {
    const billItemsContainer = document.getElementById('bill-items');
    billItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    // Add each item to the bill
    orderItems.forEach(item => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);
        
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(priceCell);
        
        const totalCell = document.createElement('td');
        totalCell.textContent = `$${item.total.toFixed(2)}`;
        row.appendChild(totalCell);
        
        billItemsContainer.appendChild(row);
        
        subtotal += item.total;
    });
    
    // Calculate tax and total
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    // Update totals in the bill
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle feedback form submission
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    const feedbackData = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        rating: document.querySelector('input[name="rating"]:checked').value,
        foodQuality: document.getElementById('food-quality').value,
        service: document.getElementById('service').value,
        comments: document.getElementById('comments').value,
        order: orderItems
    };
    
    console.log('Feedback submitted:', feedbackData);
    
    // Show success message
    document.getElementById('feedback-form').reset();
    document.getElementById('success-message').classList.remove('hidden');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('success-message').classList.add('hidden');
    }, 5000);
});
