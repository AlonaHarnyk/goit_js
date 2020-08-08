"use strict";

const {
  inputAmount,
  boxesWrapper,
  createButton,
  destroyButton
} = {
  inputAmount: document.querySelector(".js-input"),
  boxesWrapper: document.querySelector("#boxes"),
  createButton: document.querySelector('[data-action="create"]'),
  destroyButton: document.querySelector('[data-action="destroy"]'),
};

// 1-st version

const getAmount = function () {
  const amount = +inputAmount.value;
  createBoxes(amount);
};

const createBoxes = function (amount) {
  const box = `<div></div>`;
  const boxes = Array(amount).fill(box).join("");
  boxesWrapper.insertAdjacentHTML("afterbegin", boxes);
  const divs = [...boxesWrapper.children];
  const randomRGB = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgb( ${randomColor()} , ${randomColor()} , ${randomColor()} )`;
  };
  let initSize = 30;
  const step = 10;
  divs.map((div) => {
    div.style.backgroundColor = `${randomRGB()}`;
    initSize += step;
    div.style.width = initSize + "px";
    div.style.height = initSize + "px";
  });
};

const destroyBoxes = function () {
  boxesWrapper.innerHTML = "";
  inputAmount.value = "";
};

createButton.addEventListener("click", getAmount);
destroyButton.addEventListener("click", destroyBoxes);

// 2-nd version

// const manageBoxes = {
//   createBoxes: function () {
//     boxesWrapper.innerHTML = "";
//     const amount = +inputAmount.value;
//     const randomRGB = () => {
//       const randomColor = () => Math.floor(Math.random() * 256);
//       return `rgb( ${randomColor()} , ${randomColor()} , ${randomColor()} )`;
//     };
//     let initSize = 30;
//     const step = 10;
//     const emptyArray = [];
//     emptyArray.length = amount;
//     const boxes = [...emptyArray]
//       .map((element) => {
//         initSize += step;
//         element = `<div style="width: ${initSize}px; height: ${initSize}px; background-color: ${randomRGB()};"></div>`;
//         return element;
//       })
//       .join("");
//     boxesWrapper.insertAdjacentHTML("afterbegin", boxes);
//   },
//   destroyBoxes: function () {
//     boxesWrapper.innerHTML = "";
//     inputAmount.value = "";
//   },
// };

// createButton.addEventListener(
//   "click",
//   manageBoxes.createBoxes.bind(manageBoxes)
// );
// destroyButton.addEventListener(
//   "click",
//   manageBoxes.destroyBoxes.bind(manageBoxes)
// );