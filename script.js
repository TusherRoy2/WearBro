// ===============================
// 🕓 প্রি-লোডার ফাংশন (optional)
// ===============================
let pre_loader = document.querySelector(".pre_loader");
let app = document.querySelector(".app");

function loader() {
  if (!pre_loader || !app) return;
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
let productData = typeof data !== "undefined" ? data.data : [];

function productList() {
  if (!productCards || !productData.length) return;

  productCards.innerHTML = `${[...productData]
  .reverse()
  .map((ele) => {
      return `
      <div class="mainProBox">
        <i class="fa-solid fa-circle-xmark"></i>
        <div class="flex">
          <div>
            <img src="${ele.image}" alt="Product" class="mb-4 rounded" />
          </div>
          <div>
            <h4 class="text-2xl font-semibold">Name: ${ele.name}</h4>
            <em class="text-gray-500">
              Price: ৳${ele.price.discount_price} - 
              <del class="text-gray-500">৳${ele.price.regular_price}</del>
            </em>
            <p class="text-gray-500">Category: ${ele.category}</p>
            <p class="text-gray-500">Type: ${ele.type}</p>
            <p class="text-gray-500">Colour: ${ele.color}</p>
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
      <div class="product-card mainPro border rounded-xl p-4 shadow hover:shadow-lg">
        <img src="${ele.image}" alt="Product" class="mb-4 rounded" />
        <h4 class="text-xl font-semibold">${ele.name}</h4>
        <p class="text-gray-500">৳${ele.price.discount_price}</p>
        <span class="text-gray-500">${ele.type}</span> / <span class="text-gray-500">${ele.color}</span> / <span class="text-gray-500">${ele.gender}</span> / <span class="text-gray-500">${ele.category}</span>
        <h3 class="text-gray-500">Brand: ${ele.brand}</h3>

        <div class="allBtn">
          <button class="custom-btn w-full bg-blue-700 text-white rounded hover:bg-blue-800" onclick="checkDetails(this)">
            Check Details
          </button>

          <button class="btn custom-btn" onclick="addToCart('Name: ${ele.name} / Product-Code: ${ele.product_code}', ${ele.price.discount_price})">
            Add to Cart
          </button>

          <button class="whatsapp-btn w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            data-title="${ele.name}" data-price="৳${ele.price.discount_price}" data-size="${ele.available_sizes}">
            WhatsApp-এ মেসেজ করুন
          </button>
        </div>
      </div>`;
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

// যদি প্রোডাক্ট সেকশন থাকে তবে লোড করো
productList();

// ===============================
// 📱 মোবাইল মেনু (সব পেজে কাজ করবে)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".fa-bars-staggered");
  const closeBtn = document.querySelector(".fa-xmark");
  const mobileMenu = document.querySelector(".mobileMenu");

  if (menuBtn && closeBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.style.right = "0";
      menuBtn.style.display = "none";
      closeBtn.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.style.right = "-100%";
      closeBtn.style.display = "none";
      menuBtn.style.display = "block";
    });
  }

  // ===============================
  // 🔝 Scroll to Top Button
  // ===============================
  const scrollTopBtn = document.querySelector(".scrTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const scrollInterval = setInterval(() => {
        window.scrollBy(0, -50);
        if (window.scrollY <= 0) {
          clearInterval(scrollInterval);
        }
      }, 10);
    });
  }

  // ===============================
  // 📰 Text Scroller Hover Pause
  // ===============================
  const scroller = document.querySelector(".text-scroller p");
  if (scroller) {
    scroller.addEventListener("mouseenter", () => {
      scroller.style.animationPlayState = "paused";
    });
    scroller.addEventListener("mouseleave", () => {
      scroller.style.animationPlayState = "running";
    });
  }
});



// ?Search Filter

function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const normalizedQuery = query.toLowerCase().trim();

    let productsFound = false;

    productCards.forEach(card => {
        
        // ✅ আপডেট: h4 সহ পুরো কার্ডের টেক্সট সংগ্রহ করা হচ্ছে
        // এটি পণ্যের নাম, বর্ণনা, মূল্য, এবং কার্ডের ভেতরের অন্যান্য টেক্সট কভার করবে
      const cardText = card.textContent.toLowerCase();
      console.log(cardText);

        // 1. ম্যাচিং চেক: কার্ডের ভেতরের যেকোনো টেক্সট-এর সাথে কোয়েরি মিলছে কি না
        //    বা কোয়েরি ফাঁকা হলে (সব দেখানো হবে)
        if (cardText.includes(normalizedQuery) || normalizedQuery === "") {
            card.style.display = 'block'; 
            productsFound = true;
        } else {
            card.style.display = 'none'; // লুকিয়ে রাখো
        }
    });

    // 2. কোনো পণ্য না পাওয়া গেলে ইউজারকে তা জানানো
    if (!productsFound && normalizedQuery !== "") {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

// ইভেন্ট লিসেনার সেট আপ করা (আগের মতোই থাকবে)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('productSearchInput');
    const searchButton = document.getElementById('productSearchButton');

    // সার্চ বাটন ক্লিক
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            filterProducts(searchInput.value);
        });
    }

    // ইনপুট বক্সে টাইপ করার সাথে সাথে ফিল্টারিং
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterProducts(searchInput.value);
        });
        
        // 'Enter' কী প্রেস ইভেন্ট
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filterProducts(searchInput.value);
            }
        });
    }
    
    // পেজ লোডের সময় URL query parameter থাকলে ফিল্টারিং করা
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('search');
    
    if (initialQuery) {
        searchInput.value = initialQuery; 
        filterProducts(initialQuery);     
    } else {
        filterProducts(""); 
    }
});
