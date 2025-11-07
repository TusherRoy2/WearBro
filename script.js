$(document).ready(function () {
        $(".owl-carousel").owlCarousel({
          loop: true,
          margin: 20,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
          },
        });
      });


// ===============================
// 🕓 প্রি-লোডার ফাংশন (optional)
// ===============================
let pre_loader = document.querySelector(".pre_loader");
let app = document.querySelector(".app");

function loader() {
  if (!pre_loader || !app) return; // <-- এই লাইনটি যোগ করো
  pre_loader.classList.add("none");
  app.classList.add("active");
  if (pre_loader.classList.contains("none")) {
    clearInterval(interval);
  }
}

let interval = setInterval(loader, 1000);

// ===============================
// 🛍️ প্রোডাক্ট লিস্ট দেখানোর ফাংশন
// ===============================
let productCards = document.querySelector(".productCards");

// এখানে product data আসছে অন্য ফাইল থেকে (products.js)
let productData = typeof data !== "undefined" ? data.data : [];

function productList() {
  if (!productCards || !productData.length) return;

  productCards.innerHTML = `${productData
    .map((ele) => {
      return `
      <div class="mainProBox"> <!--Show Product Details-->
        <i class="fa-solid fa-circle-xmark"></i>
        <div class="flex">
          <div>
            <img src="${ele.image}" alt="Product" class="mb-4 rounded" />
          </div>

          <div>
            <h4 class="text-2xl font-semibold">Name: ${ele.name}</h4>
            <em class="text-gray-500">Price: ৳${ele.price.discount_price} - {<del class="text-gray-500">1250৳</del>}</em>
            <p class="text-gray-500">Category: ${ele.category}</p>
            <p class="text-gray-500">Type: ${ele.type}</p>
            <p class="text-gray-500">Available Size: ${ele.available_sizes}</p>
            <p class="text-gray-500">Features: ${ele.features}</p>
            <p class="text-gray-500">For: ${ele.gender}</p>
            <p class="text-gray-500">Brand: ${ele.brand}</p>
            <p class="text-gray-500">Product-Code: ${ele.product_code}</p>
            <p class="text-gray-500">Availability: ${ele.availability[0]}</p>
            <p class="text-gray-500">Delivery: ${ele.delivery.method[3]}</p>
            <p class="text-gray-500">Coverage: <code>${ele.delivery.coverage}</code></p>
          </div>
        </div>
      </div>

      <!-- Product Card -->
      <div class="mainPro border rounded-xl p-4 shadow hover:shadow-lg">
        <img src="${ele.image}" alt="Product" class="mb-4 rounded" />
        <h4 class="text-xl font-semibold">${ele.name}</h4>
        <p class="text-gray-500">৳${ele.price.discount_price}</p>
        <p class="text-gray-500">Available Size: ${ele.available_sizes}</p>

        <div class="allBtn">
          <button class="custom-btn w-full bg-blue-700 text-white rounded hover:bg-blue-800" onclick="checkDetails(this)">
            Check Details
          </button>

          <button class="btn custom-btn" onclick="addToCart('Name: ${ele.name} / Product-Code: ${ele.product_code}', ${ele.price.discount_price})">Add to Cart</button>

          <button class="whatsapp-btn w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            data-title="${ele.name}" data-price="৳${ele.price.discount_price}" data-size="${ele.available_sizes}">
            WhatsApp-এ মেসেজ করুন
          </button>
        </div>
      </div>
      `;
    })
    .join("")}`;
}

function checkDetails(e) {
  let box = e.parentElement.parentElement.previousElementSibling;
  box.style.display = "flex";
  let xMark = box.children[0];
  if (xMark) {
    xMark.addEventListener("click", () => {
      box.style.display = "none";
    });
  }
}

// Product list দেখাও যদি productCards থাকে
productList();

// ===============================
// 📱 মোবাইল মেনু (সব পেজে কাজ করবে)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  let staggered = document.querySelector(".fa-bars-staggered");
  let xmark = document.querySelector(".fa-xmark");
  let mobileMenu = document.querySelector(".mobileMenu");

  // element গুলো থাকলে তখনই কাজ করাও
  if (staggered && xmark && mobileMenu) {
    staggered.addEventListener("click", () => {
      mobileMenu.style.right = "0px";
      staggered.style.display = "none";
      xmark.style.display = "block";
    });

    xmark.addEventListener("click", () => {
      mobileMenu.style.right = "-40rem";
      staggered.style.display = "block";
      xmark.style.display = "none";
    });
  }

  // ===============================
  // 🔝 Scroll to Top Button
  // ===============================

  // আইকনটি select করা
  const scrollTopBtn = document.querySelector(".scrTop");

  // স্ক্রল করলে চেক করো — ২০০px এর বেশি হলে দেখাও
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // ধীরে ধীরে উপরে ওঠার ফাংশন
  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // প্রতি 10 মিলিসেকেন্ডে কিছু কিছু করে উপরে উঠবে
    const scrollInterval = setInterval(() => {
      // ধীরে উঠানোর জন্য step ছোট রেখেছি
      window.scrollBy(0, -50); // প্রতিবার 50px করে উপরে উঠবে
      if (window.scrollY <= 0) {
        clearInterval(scrollInterval); // একদম উপরে পৌঁছালে থেমে যাবে
      }
    }, 10); // ← চাইলে এটাকে বাড়িয়ে ধীর করতে পারো (যেমন 15 বা 20)
  });

  // marquee tag scroller
  const scroller = document.querySelector(".text-scroller p");

  scroller.addEventListener("mouseenter", () => {
    scroller.style.animationPlayState = "paused";
  });

  scroller.addEventListener("mouseleave", () => {
    scroller.style.animationPlayState = "running";
  });
});
