let cart = [];// Initialize empty cart array

fetch('medicines.json')// Load medicine data from the JSON file (you'll replace this with fetching your actual JSON)
    .then(response => response.json())
    .then(data => initializeMedicineList(data));


// Function to initialize medicine list dynamically
function initializeMedicineList(data) {
    const categories = ['Analgesics', 'Antibiotics', 'Antidepressants', 'Antihistamines', 'Antihypertensives'];

    categories.forEach(category => {
        const section = document.getElementById(category.toLowerCase());
        const medicines = data[category];

        medicines.forEach(medicine => {
            const medicineItem = document.createElement('div');
            medicineItem.classList.add('medicine-item');
            medicineItem.setAttribute('data-category', category);

            // Create and append image
            const img = document.createElement('img');
            img.src = medicine.image;  // Set image source
            img.alt = medicine.name;   // Set alt text
            img.classList.add('medicine-image');
            medicineItem.appendChild(img);

            // Create and append medicine name
            const medicineName = document.createElement('span');
            medicineName.textContent = medicine.name;
            medicineItem.appendChild(medicineName);

            // Create and append price
            const price = document.createElement('span');
            price.textContent = medicine.display_price;
            medicineItem.appendChild(price);

            // Create and append quantity input
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            medicineItem.appendChild(quantityInput);

            // Create and append add-to-cart button
            const addButton = document.createElement('button');
            addButton.classList.add('add-to-cart');
            addButton.textContent = 'Add to Cart';
            addButton.onclick = () => addToCart(category, medicine, quantityInput.value);
            medicineItem.appendChild(addButton);

            // Append the medicine item to the category section
            section.appendChild(medicineItem);
        });
    });
}

// Add item to cart
function addToCart(category, medicine, quantity) {
    const price = medicine.price;
    const existingItem = cart.find(item => item.name === medicine.name);

    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
        existingItem.totalPrice += price * quantity;
    } else {
        cart.push({ name: medicine.name, quantity: parseInt(quantity), totalPrice: price * quantity });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    const tbody = document.querySelector('#order-summary tbody');
    const totalPriceElement = document.getElementById('total-price');
    tbody.innerHTML = '';  // Clear current table
    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>$${item.totalPrice}</td>`;
        tbody.appendChild(row);
        totalPrice += item.totalPrice;
    });

    totalPriceElement.textContent = `$${totalPrice}`;
}

// Save favorites to localStorage
document.getElementById('save-favorites').addEventListener('click', () => {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
});

// Apply favorites from localStorage
document.getElementById('apply-favorites').addEventListener('click', () => {
    const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favoriteOrder) {
        cart = favoriteOrder;
        updateCart();
    }
});

// Redirect to order page on "Buy Now"
document.getElementById('buy-now').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding.");
    } else {
        // Save the cart to localStorage before redirecting
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'order-details.html';  // Redirect to order details page
    }
});
