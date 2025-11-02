let pre_loader = document.querySelector(".pre_loader");
let app = document.querySelector(".app");
function loader() {
    pre_loader.classList.add("none");
    app.classList.add("active");
    if (pre_loader.classList.contains("none")) {
        clearInterval(interval);
    }
}

let interval = setInterval(loader, 1000);

let productCards = document.querySelector(".productCards");

let productData = data.data;

function productList() {
    productCards.innerHTML = `${productData.map((ele) => {
      return `
        <div class="mainProBox"> <!--Show Product Details-->
            <i class="fa-solid fa-circle-xmark"></i>
            <div class="flex">
            <div>
            <img src="${ele.image}" alt="Product" class="mb-4 rounded" />
            </div>

            <div>
            <h4 class="text-2xl font-semibold">Name: ${ele.name}</h4>
            <em class="text-gray-500">Price: ৳${ele.price.discount_price} - {<em> Discount Price </em>}</em>
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
              <button class="custom-btn w-full mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" onclick="checkDetails(this)">
                Check Details
              </button>

              <button class="btn custom-btn" onclick="addToCart('Name: ${ele.name} / Product-Code: ${ele.product_code}', ${ele.price.discount_price})">Add to Cart</button>

              <button class="whatsapp-btn w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                data-title="Print-Cotton" data-price="৳700" data-size="M - L - XL">
                WhatsApp-এ মেসেজ করুন
              </button>
            </div>
          </div>
          
          `
    }).join("")}`
}

function checkDetails(e) {
  let box = e.parentElement.parentElement.previousElementSibling;
  box.style.display = "flex";
  console.log(e.parentElement.children[0]);
  let xMark = box.children[0];
  if (xMark) {
    xMark.addEventListener("click", () => {
    box.style.display = "none";
  })
  }
}

productList();