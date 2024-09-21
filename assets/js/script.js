// Add Element
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


// Navbar toggler

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

// Header and back to top BTN

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", showElemOnScroll);


// Add Products


document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.getElementById('cart-container');
  const checkoutContainer = document.getElementById('checkout-container');

  let cart = {};
  let totalPrice = 0;

  function addProduct(name, price, imageUrl) {
    const productContainer = document.getElementById('product-container');
    const productCardHTML = `
          <li class="decoration">
              <div class="product-card">
                  <a href="#" class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
                      <img src="${imageUrl}" loading="lazy" alt="${name}" class="img-cover">
                      <ul class="card-action-list">
                          <li>
                              <button class="card-action-btn add-to-cart-btn">
                                  <ion-icon name="add-outline"></ion-icon>
                              </button>
                          </li>
                          <li>
                              <button class="card-action-btn">
                                  <ion-icon name="bag-handle-outline"></ion-icon>
                              </button>
                          </li>
                          <li>
                              <button class="card-action-btn">
                                  <ion-icon name="heart-outline"></ion-icon>
                              </button>
                          </li>
                      </ul>
                  </a>
                  <div class="card-content">
                      <h3 class="h3">
                          <a href="#" class="card-title">${name}</a>
                      </h3>
                      <div class="card-price">
                          <data class="price" value="${price}">$${price}</data>
                      </div>
                  </div>
              </div>
          </li>
      `;
    productContainer.insertAdjacentHTML('beforeend', productCardHTML);
  }

  addProduct("Animi Dolor Pariatur", "10", "./assets/images/product-1.jpg")
  addProduct("Art Deco Home", "30", "./assets/images/product-2.jpg")
  addProduct("Artificial potted plant", "40", "./assets/images/product-3.jpg")
  addProduct("Dark Green Jug", "17.10", "./assets/images/product-4.jpg")
  addProduct("Drinking Glasses", "21", "./assets/images/product-5.jpg")
  addProduct("Helen Chair", "69.50", "./assets/images/product-6.jpg")
  addProduct("High Quality Glass Bottle", "30.10", "./assets/images/product-7.jpg")
  addProduct("Living Room & Bedroom Lights", "45", "./assets/images/product-8.jpg")
  addProduct("Nancy Chair", "90", "./assets/images/product-9.jpg")
  addProduct("Simple Chair", "40", "./assets/images/product-10.jpg")
  addProduct("Smooth Disk", "46", "./assets/images/product-11.jpg")
  addProduct("Table Black", "67", "./assets/images/product-12.jpg")
  addProduct("Table Wood Pine", "50", "./assets/images/product-13.jpg")
  addProduct("Teapot with black tea", "25", "./assets/images/product-14.jpg")
  addProduct("Unique Decoration", "15", "./assets/images/product-15.jpg")
  addProduct("Vase Of Flowers", "77", "./assets/images/product-16.jpg")
  addProduct("Wood Eggs", "19", "./assets/images/product-17.jpg")
  addProduct("Wooden Box", "27", "./assets/images/product-18.jpg")
  addProduct("Wooden Cups", "29", "./assets/images/product-19.jpg")
  function updateCartUI() {
    cartContainer.innerHTML = '';
    totalPrice = 0;

    Object.keys(cart).forEach((productName) => {
      const item = cart[productName];
      const itemTotalPrice = item.price * item.quantity;
      totalPrice += itemTotalPrice;

      const cartItemHTML = `
          <li class="cart-item">
              <div class="cart-card">
                  <a href="#" class="card-banner img-holder has-before" style="--width: 100; --height: 100;">
                      <img src="${item.imageUrl}" loading="lazy" alt="${productName}" class="img-cover">
                  </a>
                  <div class="card-content">
                      <h3 class="h3">
                          <a href="#" class="card-title">${productName}</a>
                      </h3>
                      <div class="cart-quantity">
                          Quantity: ${item.quantity}
                      </div>
                      <div class="card-price">
                          Price: $${item.price} x ${item.quantity} = $${itemTotalPrice.toFixed(2)}
                      </div>
                  </div>
              </div>
          </li>
      `;
      cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    checkoutContainer.innerHTML = `
      <div class="total-price">
        Total: $${totalPrice.toFixed(2)}
      </div>
      <button id="checkout-btn" class="checkout-btn">Checkout</button>
    `;
  }
  function addToCart(name, price, imageUrl) {
    price = parseFloat(price);
    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = {
        price: price,
        quantity: 1,
        imageUrl: imageUrl
      };
    }

    updateCartUI();
  }

  document.getElementById('product-container').addEventListener('click', function (e) {
    if (e.target.closest('.add-to-cart-btn')) {
      const productCard = e.target.closest('.product-card');
      const name = productCard.querySelector('.card-title').textContent;
      const price = productCard.querySelector('.price').getAttribute('value');
      const imageUrl = productCard.querySelector('img').src;

      addToCart(name, price, imageUrl);
    }
  });

  checkoutContainer.addEventListener('click', function (e) {
    if (e.target.id === 'checkout-btn') {
      alert(`Proceeding to checkout. Total: $${totalPrice.toFixed(2)}`);
    }
  });
});
