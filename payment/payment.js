
document.addEventListener('DOMContentLoaded', function() {
    // Get amount from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const checkoutAmount = localStorage.getItem('checkoutAmount');
    
    // Calculate total if not already stored in checkoutAmount
    let totalAmount = 0;
    
    if (checkoutAmount) {
        totalAmount = checkoutAmount;
    } else {
       
        totalAmount = cart.reduce((total, item) => {
            const price = parseFloat(item.price.toString().replace(/[^\d.]/g, ''));
            return total + (price * (item.quantity || 1));
        }, 0);
    }
    
  
    const amountInput = document.getElementById('amount');
    amountInput.value = `₹ ${totalAmount.toFixed(2)}`;

    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        
        e.target.value = value;
    });
    
    // Handle form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
 
        const cardHolder = document.getElementById('card-holder').value;
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        
       
        if (cvv.length !== 3) {
            showError('Please enter a valid 3-digit CVV');
            return;
        }
        
     
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        

        const [expYear, expMonth] = expiryDate.split('-').map(Number);
        
 
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            showError('Your card has expired. Please use a different card.');
            return;
        }
        
       
        Swal.fire({
            title: 'Processing Payment',
            text: 'Please wait while we process your payment...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
   
        setTimeout(() => {
            
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: `Thank you, ${cardHolder}! Your payment of ₹${totalAmount.toFixed(2)} has been processed successfully.`,
                confirmButtonText: 'Continue'
            }).then((result) => {
                if (result.isConfirmed) {
                  
                    localStorage.removeItem('cart');
                    localStorage.removeItem('checkoutAmount');
                    
                
                    saveOrderHistory(totalAmount, cart);
                    
                    // Redirect to order confirmation or home page
                    window.location.href = '../main/index.html';
                }
            });
        }, 2000);
    });
    

    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        });
    }
    
   
    function saveOrderHistory(amount, items) {
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        
        const newOrder = {
            orderId: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            amount: amount,
            items: items,
            paymentMethod: 'Credit Card'
        };
        
        orderHistory.push(newOrder);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
});