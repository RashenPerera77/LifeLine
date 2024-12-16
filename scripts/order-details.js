document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const orderItemsTable = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
  
    let totalPrice = 0;
  
    // Populate the order items table
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.totalPrice}</td>
        `;
        orderItemsTable.appendChild(row);
        totalPrice += item.totalPrice;
    });
  
    // Update the total price
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  
    // Validate phone number: only numbers allowed
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
  
    // Event listener to validate the phone input
    phoneInput.addEventListener("input", function() {
        const phoneValue = phoneInput.value;
        const regex = /^[0-9]*$/;  // Regex to allow only numbers
  
        if (!regex.test(phoneValue)) {
            phoneError.style.display = "inline"; // Show error message
        } else {
            phoneError.style.display = "none"; // Hide error message
        }
    });
  
    // Handle payment method selection
    const paymentMethodSelect = document.getElementById("payment-method");
    const cardPayment = document.getElementById("card-payment");
    const paypalPayment = document.getElementById("paypal-payment");
    const bankPayment = document.getElementById("bank-payment");
    const codPayment = document.getElementById("cod-payment");
  
    paymentMethodSelect.addEventListener("change", function() {
        const selectedMethod = paymentMethodSelect.value;
        
        // Hide all payment options
        cardPayment.style.display = "none";
        paypalPayment.style.display = "none";
        bankPayment.style.display = "none";
        codPayment.style.display = "none";
  
        // Show selected payment method
        if (selectedMethod === "card") {
            cardPayment.style.display = "block";
        } else if (selectedMethod === "paypal") {
            paypalPayment.style.display = "block";
        } else if (selectedMethod === "bank") {
            bankPayment.style.display = "block";
        } else if (selectedMethod === "cod") {
            codPayment.style.display = "block";
        }
    });
  
    // Validate card number and CVV
    const cardNumberInput = document.getElementById("card-number");
    const cardNumberError = document.getElementById("card-number-error");
    const cvvInput = document.getElementById("cvv");
    const cvvError = document.getElementById("cvv-error");
  
    cardNumberInput.addEventListener("input", function() {
        const cardNumberValue = cardNumberInput.value;
        const regex = /^[0-9]{16}$/; // Valid card number format (16 digits)
  
        if (!regex.test(cardNumberValue.replace(/[^0-9]/g, ''))) {
            cardNumberError.style.display = "inline";
        } else {
            cardNumberError.style.display = "none";
        }
    });
  
    cvvInput.addEventListener("input", function() {
        const cvvValue = cvvInput.value;
        const regex = /^[0-9]{3}$/; // Valid CVV format (3 digits)
  
        if (!regex.test(cvvValue)) {
            cvvError.style.display = "inline";
        } else {
            cvvError.style.display = "none";
        }
    });
  
    // Handle form submission
    document.getElementById("submit-order").addEventListener("click", function() {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;
        const paymentMethod = document.getElementById("payment-method").value;
        const cardNumber = document.getElementById("card-number").value;
        const cvv = document.getElementById("cvv").value;
  
        if (name && address && phone && paymentMethod) {
            if (paymentMethod === "card" && /^[0-9]{16}$/.test(cardNumber) && /^[0-9]{3}$/.test(cvv)) {
                alert("Thank you for your order!");
            } else if (paymentMethod === "cod") {
                alert("Thank you for choosing Cash on Delivery!");
            } else {
                alert("Please fill out all fields and provide valid payment details.");
            }
        } else {
            alert("Please fill out all fields.");
        }
    });
  
    // Handle cancel order
    document.getElementById("cancel-order").addEventListener("click", function() {
        window.location.href = "index.html"; // Redirect to homepage or previous page
    });
  });
  