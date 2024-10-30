interface Product {
  id: number;
  img: string;
  brand: string;
  about: string;
  price: number;
}

interface BasketItem {
  id: number;
  count: number;
}

// Safely query the DOM elements
const cardBascket = document.querySelector<HTMLElement>(".cards")!;
const parentBascket = document.querySelector<HTMLElement>(".parent_bascket")!;
const sumBtn = document.querySelector<HTMLElement>(".sum-btn")!;

let arr: number[] = [];
let allSum: number;
let sum = 0;

// Check if "bascket" exists in localStorage
if (!localStorage.hasOwnProperty("bascket")) {
  parentBascket.innerHTML = `
    <div class="card_main_empty_div">
      <div class="card_main_empty_div1">
          <h2 class="korzina">Корзина</h2>
      </div>
      <br>
      <div class="card_main_empty_div2">
          <img class="cmed2_img" src="../img/sad 1.png" alt="Empty Card">
      </div>
      <br><br>
      <div class="card_main_empty_div3">
          <p class="cmed3_p">Пока что здесь ничего нет, перейдите в <br> каталог и добавьте интересующий товар</p>                    
      </div>
      <br><br>
      <div class="card_main_empty_div4">
        <button class="pay_btn">
          <a class="katalog" href="../html/index.html">Перейти в каталог</a>
        </button>
      </div>
    </div>`;
} else {
  const dataReceived: BasketItem[] = JSON.parse(localStorage.getItem("bascket") || "[]");

  dataReceived.forEach((e: BasketItem) => {
    fetch(`https://retoolapi.dev/cG7rV9/data/${e.id}`)
      .then((response) => response.json())
      .then((car: Product) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="product-card">
            <div class="product-img">
              <img src="${car.img}" alt="" />
            </div>
            <div class="product-name">
              <p>${car.brand}</p>
            </div>
            <div class="product-text">
              <p>${car.about}</p>
            </div>
            <div class="product-price">
              <p>${car.price}р.</p>
              <span class="mention">
                <span class="minus">-</span>${e.count}<span class="plus">+</span>
              </span>
              <button class="add-btn-ka">
                <img src="../img/kaylaska.png" alt="" />
              </button>
            </div>
          </div>`;
        
        cardBascket.append(div);
        sum += car.price;
        allSum = sum * e.count;
      })
      .then(() => {
        arr.push(allSum);
      })
      .finally(() => {
        sumBtn.innerHTML = `${arr[arr.length - 1] || 0}`;
      });
  });
}
