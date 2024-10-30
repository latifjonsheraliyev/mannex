
let img = document.querySelector(".slide-img");
let nextSlide = document.querySelector(".nextslide");
let prevSlide = document.querySelector(".prevslide");
let arr = [
  "./img/Товар.png",
  "./img/Product-2.png",
  "./img/Product-5.png",
  "./img/Товар.png",
  "./img/Product-2.png",
  "./img/Product-5.png",
  "./img/Товар.png",
  "./img/Product-2.png",
];
let i = 0;
let count = document.querySelector(".count-of-slider");

count.innerHTML = `<span class="activ_item">01</span>/<span class="slider_items_length">0${arr.length}</span>`;

function updateSlider(index) {
  img.src = arr[index];
  count.innerHTML = `<span class="activ_item">0${index + 1}</span>/<span class="slider_items_length">0${arr.length}</span>`;
}

nextSlide.addEventListener("click", () => {
  i = (i + 1) % arr.length;
  updateSlider(i);
});

prevSlide.addEventListener("click", () => {
  i = (i - 1 + arr.length) % arr.length;
  updateSlider(i);
});


const countItemsPerPage = window.innerWidth > 1124 ? 6 : 4;
const parent = document.querySelector(".cards");
const pageCount = document.querySelector(".pagess");

let currentPage = 1;
let allData = [];

async function allDataCollector() {
  const response = await fetch("https://retoolapi.dev/cG7rV9/data");
  allData = await response.json();
}

async function dataReceived(page) {
  const response = await fetch(
    `https://api-generator.retool.com/cG7rV9/data?_page=${page}&_limit=${countItemsPerPage}`
  );
  return await response.json();
}

async function changePage(page) {
  await allDataCollector(); 
  const totalPages = Math.ceil(allData.length / countItemsPerPage);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  currentPage = page;

  const response = await dataReceived(page);
  renderPagination(totalPages);
  drawElement(parent, response);
  addBasketLogic(response);
}

function renderPagination(totalPages) {
  let pageDots = [];
  let left = Math.max(currentPage - 1, 1);
  let right = Math.min(currentPage + 1, totalPages);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pageDots.push(i);
    } else if (pageDots[pageDots.length - 1] !== "...") {
      pageDots.push("...");
    }
  }

  pageCount.innerHTML = "";
  pageDots.forEach((page) => {
    let span = document.createElement("span");
    span.innerText = page;
    if (page !== "...") {
      span.addEventListener("click", () => changePage(page));
    }
    pageCount.append(span);
  });
}

function drawElement(parent, response) {
  parent.innerHTML = "";
  response.forEach((item) => {
    const div = document.createElement("div");
    div.dataset.id = item.id;
    div.classList.add("product-card");
    div.innerHTML = `
      <div class="product-img"><img src="${item.img}" alt=""></div>
      <div class="product-name"><p>${item.brand}</p></div>
      <div class="product-text"><p>${item.about}</p></div>
      <div class="product-price">
        <p class="count-price">${item.price}p.</p>
        <span class="mention">
          <span class="minus">-</span><span>1</span><span class="plus">+</span>
        </span>
        <button class="add-btn-ka"><img src="./img/kaylaska.png" alt=""></button>
      </div>`;
    parent.append(div);
  });
}

function addBasketLogic(response) {
  const addBtn = document.querySelectorAll(".add-btn-ka");
  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");

  plus.forEach((btn) =>
    btn.addEventListener("click", () => updateQuantity(btn, response, 1))
  );

  minus.forEach((btn) =>
    btn.addEventListener("click", () => updateQuantity(btn, response, -1))
  );

  addBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.closest(".product-card").dataset.id;
      const quantity = btn.previousElementSibling.children[1].innerText;
      addToBasket(id, quantity);
    })
  );
}

function updateQuantity(btn, response, delta) {
  const quantityElem = delta > 0 ? btn.previousElementSibling : btn.nextElementSibling;
  let count = Math.max(1, +quantityElem.innerText + delta);
  quantityElem.innerText = count;

  const cardId = btn.closest(".product-card").dataset.id;
  const product = response.find((item) => item.id == cardId);
  const priceElem = btn.closest(".product-price").querySelector(".count-price");
  priceElem.innerText = `${product.price * count}p.`;
}

function addToBasket(id, count) {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const newItem = { id, count };
  const updatedBasket = [
    ...new Map([...basket, newItem].map((item) => [item.id, item])).values(),
  ];
  localStorage.setItem("basket", JSON.stringify(updatedBasket));
}

window.onload = () => {
  changePage(1);
};
