// // Load price from sessionStorage on page load
// window.onload = function () {
//     const selectedItems = JSON.parse(sessionStorage.getItem("selectedItem"));

//     // Calculate total price for multiple or single items
//     if (Array.isArray(selectedItems)) {
//         const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
//         document.getElementById("amount").value = `$${total.toFixed(2)}`;
//     }
//     else if (selectedItems && selectedItems.price) {
//         document.getElementById("amount").value = `$${selectedItems.price.toFixed(2)}`;
//     } else {
//         document.getElementById("amount").value = "$0.00";
//     }
// };

// // Handle form submission
// document.getElementById("payment-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Collect form data
//     const cardHolder = document.getElementById("card-holder").value;
//     const cardNumber = document.getElementById("card-number").value;
//     const expiryDate = document.getElementById("expiry-date").value;
//     const cvv = document.getElementById("cvv").value;
//     const amount = document.getElementById("amount").value;

//     // Basic validation
//     if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
//         Swal.fire({
//             title: "Error",
//             text: "Please fill out all required fields.",
//             icon: "error",
//             confirmButtonColor: "#45a049"
//         });
//         return;
//     }

//     // Simple card number validation (just checking if it's numeric)
//     if (!/^\d+$/.test(cardNumber)) {
//         Swal.fire({
//             title: "Error",
//             text: "Card number should contain only numbers.",
//             icon: "error",
//             confirmButtonColor: "#45a049"
//         });
//         return;
//     }

//     // Simple CVV validation (must be 3 digits)
//     if (!/^\d{3}$/.test(cvv)) {
//         Swal.fire({
//             title: "Error",
//             text: "CVV must be 3 digits.",
//             icon: "error",
//             confirmButtonColor: "#45a049"
//         });
//         return;
//     }

//     // Save data to sessionStorage
//     sessionStorage.setItem("paymentDetails", JSON.stringify({
//         cardHolder: cardHolder,
//         cardNumber: cardNumber,
//         amount: amount
//     }));

//     // Show success message and redirect
//     Swal.fire({
//         title: "Payment Successful",
//         icon: "success",
//         html: `Payment of ${amount} was successful! Thank you, ${cardHolder}.`,
//         showCloseButton: true,
//         focusConfirm: false,
//         confirmButtonText: `<i class="fa fa-thumbs-up"></i> Ok!`,
//         confirmButtonColor: "#45a049"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Clear cart data if it exists
//             if (localStorage.getItem('cartItems')) {
//                 localStorage.removeItem('cartItems');
//             }
            
//             // Redirect to home page
//             window.location.href = "../main/index.html";
//         }
//     });
// });

// // Format card number to add spaces (optional enhancement)
// document.getElementById("card-number").addEventListener("input", function(e) {
//     // Remove non-digit characters
//     let value = this.value.replace(/\D/g, '');
    
//     // Check if value has changed to avoid infinite loop
//     if (value === this.rawValue) return;
//     this.rawValue = value;
    
//     // Limit to 12 digits
//     value = value.substring(0, 12);
    
//     this.value = value;
// });


 // Load price from sessionStorage on page load
 window.onload = function () {
    const selectedItems = JSON.parse(sessionStorage.getItem("selectedItem"));

    // Calculate total price for multiple or single items
    if (Array.isArray(selectedItems)) {
        const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        document.getElementById("amount").value = `${total.toFixed(2)}`;
    }
    else if (selectedItems && selectedItems.price) {
        document.getElementById("amount").value = `${selectedItems.price.toFixed(2)}`;
    } else {
        document.getElementById("amount").value = "$0.00";
    }
};

// Handle form submission
document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const cardHolder = document.getElementById("card-holder").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const amount = document.getElementById("amount").value;

    // Validate all fields
    if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill out all required fields.");
        return;
    }

    // Simulate successful payment
    // alert(`Payment of ${amount} was successful! Thank you, ${cardHolder}.`);

    Swal.fire({
        title: "Payment successfull",
        icon: "success",
        html: `Payment of ${amount} was successful! Thank you, ${cardHolder}.`,
        showCloseButton: true,
        // showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Ok!`,

    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href="../main/index.html";
        }
    });

});

document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const cardHolder = document.getElementById("card-holder").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const amount = document.getElementById("amount").value;

    // Basic validation
    if (!cardHolder || !cardNumber || !expiryDate || !cvv || !amount) {
        alert("Please fill out all fields!");
        return;
    }

    // Save data to sessionStorage
    sessionStorage.setItem("paymentDetails", JSON.stringify({
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        amount: amount
    }));
})