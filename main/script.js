// DOM Elements
const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const close = document.getElementById('close');
const allBrands = document.querySelectorAll('.brands');
const plusIcon = document.getElementById('plus');
const sideMiddle2 = document.querySelector('.side-middle-2');
const topButton = document.querySelector('.Top');
const loading = document.querySelector('.load');
const curosal = document.querySelector('.curosal-frames');
const fontBack = document.getElementById('font-back');
const closeIcon0 = document.getElementById('closeIcon0');
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const btnIn = document.getElementById('btnIn');
const btnUp = document.getElementById('btnUp');
const signUpBtn = document.getElementById('btn1');
const loginBtn = document.getElementById('btn2');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const brandReviews = document.querySelector('.brand-reviews');
const searchInput = document.getElementById('search-input');
const cardItems = document.querySelectorAll('.cardSingle');
const allCards = document.getElementById('allcards');
const backButton = document.getElementById('back');
const fullData = document.getElementById('fulldata');
const helloName = document.getElementById('helloName');
const count = document.querySelector('#count div');

// Sidebar categories
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');

// Brand categories
const canon = document.getElementById('canon');
const nikon = document.getElementById('nikon');
const sony = document.getElementById('sony');
const panasonic = document.getElementById('Panasonic');

// Loading Animation
window.addEventListener('load', () => {
  setTimeout(() => {
    loading.style.display = 'none';
  }, 2000);
});

// Initialize variables
let currentSlide = 0;
let autoSlideInterval;
let reviewsPosition = 0;
let isLoggedIn = false;
let cartItems = [];

// Check for stored data
if (localStorage.getItem('isLoggedIn')) {
  isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
}

if (localStorage.getItem('username')) {
  helloName.textContent = localStorage.getItem('username');
}

if (localStorage.getItem('cartItems')) {
  cartItems = JSON.parse(localStorage.getItem('cartItems'));
  count.textContent = cartItems.length;
}

// Sidebar Toggle
menu.addEventListener('click', () => {
  sidebar.classList.add('active');
});

close.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Categories dropdown in sidebar
plusIcon.addEventListener('click', () => {
  sideMiddle2.style.display = sideMiddle2.style.display === 'none' || sideMiddle2.style.display === '' ? 'block' : 'none';
  plusIcon.classList.toggle('bx-plus');
  plusIcon.classList.toggle('bx-minus');
});

// Scroll to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topButton.classList.add('active');
  } else {
    topButton.classList.remove('active');
  }
});

topButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Auto sliding carousel
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 4;
    updateSlidePosition();
  }, 5000);
}

function updateSlidePosition() {
  curosal.style.transform = `translateX(-${currentSlide * 25}%)`;
}

startAutoSlide();

//btn carousel
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const carousel = document.querySelector('.brand-reviews');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const reviews = document.querySelectorAll('.review');
    
    let currentIndex = 0;
    let reviewsToShow = 3; 
    
    function updateReviewsToShow() {
      if (window.innerWidth < 768) {
        reviewsToShow = 1;
      } else if (window.innerWidth < 1024) {
        reviewsToShow = 2;
      } else {
        reviewsToShow = 3;
      }
      updateCarousel();
    }
    
    // Initial check
    updateReviewsToShow();
    

    window.addEventListener('resize', updateReviewsToShow);
    
   
    function updateCarousel() {

      reviews.forEach(review => {
        review.style.display = 'none';
      });
      
   
      for(let i = 0; i < reviewsToShow; i++) {
        const indexToShow = (currentIndex + i) % reviews.length;
        reviews[indexToShow].style.display = 'block';
      }
      
      // Update button states
      updateButtonStates();
    }
    
   
    function updateButtonStates() {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      updateCarousel();
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % reviews.length;
      updateCarousel();
    });
    
    // Initialize carousel
    updateCarousel();
  });





    document.addEventListener('DOMContentLoaded', function() { 
        const userIcon = document.getElementById('userIcon');
        const authOverlay = document.createElement('div');
        authOverlay.className = 'auth-overlay';
        
        const authCard = document.createElement('div');
        authCard.className = 'auth-card';
        
        authCard.innerHTML = `
            <div class="auth-header">
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="signin">Sign In</button>
                    <button class="auth-tab" data-tab="signup">Sign Up</button>
                </div>
                <button class="auth-close">×</button>
            </div>
            
            <div class="auth-content">
                <div class="auth-form signin-form active">
                    <h2>Welcome Back</h2>
                    <form id="signinForm">
                        <div class="form-group">
                            <i class='bx bx-envelope'></i>
                            <input type="email" id="signinEmail" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <i class='bx bx-lock-alt'></i>
                            <input type="password" id="signinPassword" placeholder="Password" required>
                        </div>
                        <div class="form-group remember">
                            <label>
                                <input type="checkbox" id="rememberMe"> Remember me
                            </label>
                            <a href="#" class="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" class="auth-button">Sign In</button>
                    </form>
                    <div class="social-login">
                        <p>Or sign in with</p>
                        <div class="social-icons">
                            <a href="#"><i class='bx bxl-google'></i></a>
                            <a href="#"><i class='bx bxl-facebook'></i></a>
                            <a href="#"><i class='bx bxl-apple'></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="auth-form signup-form">
                    <h2>Create Account</h2>
                    <form id="signupForm">
                        <div class="form-group">
                            <i class='bx bx-user'></i>
                            <input type="text" id="signupFullName" placeholder="Full Name" required>
                        </div>
                        <div class="form-group">
                            <i class='bx bx-envelope'></i>
                            <input type="email" id="signupEmail" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <i class='bx bx-lock-alt'></i>
                            <input type="password" id="signupPassword" placeholder="Password" required>
                        </div>
                        <div class="form-group">
                            <i class='bx bx-lock-alt'></i>
                            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
                        </div>
                        <div class="form-group agree-terms">
                            <label>
                                <input type="checkbox" id="agreeTerms" required> I agree to the <a href="#">Terms & Conditions</a>
                            </label>
                        </div>
                        <button type="submit" class="auth-button">Sign Up</button>
                    </form>
                    <div class="social-login">
                        <p>Or sign up with</p>
                        <div class="social-icons">
                            <a href="#"><i class='bx bxl-google'></i></a>
                            <a href="#"><i class='bx bxl-facebook'></i></a>
                            <a href="#"><i class='bx bxl-apple'></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        authOverlay.appendChild(authCard);
        document.body.appendChild(authOverlay);
        
        userIcon.addEventListener('click', function() {
            authOverlay.classList.add('active');
            setTimeout(() => {
                authCard.classList.add('active');
            }, 10);
        });
        
        const closeBtn = authCard.querySelector('.auth-close');
        closeBtn.addEventListener('click', function() {
            authCard.classList.remove('active');
            setTimeout(() => {
                authOverlay.classList.remove('active');
            }, 300);
        });
    
        authOverlay.addEventListener('click', function(e) {
            if (e.target === authOverlay) {
                authCard.classList.remove('active');
                setTimeout(() => {
                    authOverlay.classList.remove('active');
                }, 300);
            }
        });
        
        const authTabs = authCard.querySelectorAll('.auth-tab');
        const authForms = authCard.querySelectorAll('.auth-form');
        
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                this.classList.add('active');
            
                const formToShow = this.getAttribute('data-tab');
                authCard.querySelector(`.${formToShow}-form`).classList.add('active');
            });
        });
    
        // Sign Up Form Validation and Storage
        const signupForm = document.getElementById('signupForm');
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const fullName = document.getElementById('signupFullName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const agreeTerms = document.getElementById('agreeTerms').checked;
    
            if (fullName && email && password && confirmPassword && agreeTerms) {
                if (password === confirmPassword) {
                    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
                    const userExists = usersData.find(user => user.email === email);
    
                    if (userExists) {
                        Swal.fire({
                            text: "Email already registered.",
                            icon: "error"
                        });
                    } else {
                        usersData.push({
                            fullName,
                            email,
                            password
                        });
                        localStorage.setItem("usersData", JSON.stringify(usersData));
                        Swal.fire({
                            text: "Account created successfully.",
                            icon: "success"
                        });
                
                        switchToSigninForm();
                    }
                } else {
                    Swal.fire({
                        text: "Passwords do not match.",
                        icon: "error"
                    });
                }
            } else {
                Swal.fire({
                    text: "Please fill in all fields.",
                    icon: "error"
                });
            }
        });
    
        // Switch to Sign In form after Sign Up
        function switchToSigninForm() {
            const signinTab = authCard.querySelector('[data-tab="signin"]');
            signinTab.click();
        }
    
        // Sign In Form Validation
        const signinForm = document.getElementById('signinForm');
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const email = document.getElementById('signinEmail').value.trim();
            const password = document.getElementById('signinPassword').value.trim();
    
            const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
            const user = usersData.find(user => user.email === email && user.password === password);
    
            if (user) {
            
                localStorage.setItem('currentUser', JSON.stringify(user));
    
                authOverlay.classList.remove('active');
                authCard.classList.remove('active');
    
         
                const helloName = document.getElementById('helloName'); 
                if (helloName) {
                    helloName.innerHTML = `${user.fullName}!`;
                }
            } else {
                Swal.fire({
                    text: "Invalid email or password.",
                    icon: "error"
                });
            }
        });
    });
    