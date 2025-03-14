const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('proceed-to-checkout');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCartItems() {
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart-message"> <img src="../assests/cartempty.webp" alt="Empty"> <p>Your cart is empty</p></div>';
        totalPriceElement.innerHTML = 'Total Price: <span>&#8377;</span> 0';
        return;
    }
    
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        // Initialize quantity if it doesn't exist
        if (!item.quantity) {
            item.quantity = 1;
        }
        
        // Ensure item price and quantity are numbers, and calculate the price for this item
        const itemPrice = parseFloat(item.price) * Number(item.quantity);
        totalPrice += itemPrice;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image_url}" alt="${item.model}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.model}</div>
                <div class="cart-item-price">&#8377;${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class='bx bx-trash'></i>
            </button>
        `;

        cartContainer.appendChild(cartItemElement);
    });

    // Update the total price after rendering the items
    totalPriceElement.innerHTML = `Total Price: <span>&#8377;</span> ${totalPrice.toFixed(2)}`;
}

function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}

cartContainer.addEventListener('click', function(event) {
    // Handle remove item button click
    if (event.target.closest('.remove-item')) {
        const button = event.target.closest('.remove-item');
        const index = parseInt(button.dataset.index);

        Swal.fire({
            title: 'Remove item?',
            text: "Are you sure you want to remove this item from your cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff6b6b',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, remove it'
        }).then((result) => {
            if (result.isConfirmed) {
                cartItems.splice(index, 1);
                updateCart();
                Swal.fire(
                    'Removed!',
                    'The item has been removed from your cart.',
                    'success'
                );
            }
        });
    }

    // Handle decrease quantity button click
    if (event.target.classList.contains('decrease')) {
        const index = parseInt(event.target.dataset.index);
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            updateCart();
        } else {
            Swal.fire({
                title: 'Remove item?',
                text: "The quantity will be 0. Remove this item from cart?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#ff6b6b',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, remove it'
            }).then((result) => {
                if (result.isConfirmed) {
                    cartItems.splice(index, 1);
                    updateCart();
                }
            });
        }
    }

    // Handle increase quantity button click
    if (event.target.classList.contains('increase')) {
        const index = parseInt(event.target.dataset.index);
        // Ensure quantity property exists
        if (!cartItems[index].quantity) {
            cartItems[index].quantity = 1;
        }
        cartItems[index].quantity++;
        updateCart();
    }
});

checkoutButton.addEventListener('click', function() {
    if (cartItems.length === 0) {
        Swal.fire({
            title: 'Empty Cart',
            text: 'Your cart is empty. Add some items before checkout.',
            icon: 'info',
            confirmButtonColor: '#ff6b6b'
        });
        return;
    }

    Swal.fire({
        title: 'Processing Checkout',
        text: 'Please wait while we process your order...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    setTimeout(() => {
        // Calculate total price directly from cart items to avoid parsing issues
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += parseFloat(item.price) * Number(item.quantity || 1);
        });

        if (isNaN(totalPrice) || totalPrice <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'Invalid total price.',
                icon: 'error',
                confirmButtonColor: '#ff6b6b'
            });
            return;
        }

        const order = {
            items: cartItems,
            totalPrice: totalPrice,
            orderId: 'ORD-' + Date.now(),
            date: new Date().toISOString()
        };

        // Clear the cart after checkout
        cartItems = [];
        updateCart();

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        Swal.fire({
            title: 'Order Confirmed!',
            text: `Your order # ${order.orderId} has been placed successfully!`,
            icon: 'success',
            confirmButtonColor: '#ff6b6b'
        }).then(() => {
            // Redirect to home or order confirmation page
            window.location.href = '../payment/payment.html';
        });
    }, 2000);
});

renderCartItems();