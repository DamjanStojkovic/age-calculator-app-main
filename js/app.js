const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const inputs = document.querySelectorAll(".input");

const dayOutput = document.getElementById("DD");
const monthOutput = document.getElementById("MM");
const yearOutput = document.getElementById("YY");

const root = document.documentElement;
const red = getComputedStyle(root).getPropertyValue("--Light-red").trim();
const grey = getComputedStyle(root).getPropertyValue("--Off-white").trim();
const darkGrey = getComputedStyle(root)
  .getPropertyValue("--Smokey-gray")
  .trim();

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  let validator = true;

  inputs.forEach((i) => {
    const label = i.parentElement.querySelector("label");
    const small = i.parentElement.querySelector("small");
    let fieldValidator = true;

    if (!i.value) {
      i.style.borderColor = red;
      label.style.color = red;
      small.innerText = "This field is required";
      small.style.fontStyle = "italic";
      fieldValidator = false;
    } else {
      i.style.borderColor = grey;
      label.style.color = darkGrey;
      small.innerText = "";
      fieldValidator = true;

      if ((i === monthInput && i.value > 12) || i.value < 0) {
        i.style.borderColor = red;
        label.style.color = red;
        small.innerText = "Must be a valid month";
        small.style.fontStyle = "italic";
        fieldValidator = false;
      }

      if ((i === dayInput && i.value > 31) || i.value < 0) {
        i.style.borderColor = red;
        label.style.color = red;
        small.innerText = "Must be a valid day";
        small.style.fontStyle = "italic";
        fieldValidator = false;
      }

      if (i === yearInput && i.value > year) {
        i.style.borderColor = red;
        label.style.color = red;
        small.innerText = "Must be in the past";
        small.style.fontStyle = "italic";
        fieldValidator = false;
      }
    }
    validator = validator && fieldValidator;
  });
  return validator;
}

function validDate() {
  let daysInMonth = months[monthInput.value - 1];
  let validator = true;

  inputs.forEach((i) => {
    const label = i.parentElement.querySelector("label");
    const small = dayInput.parentElement.querySelector("small");
    if (dayInput.value > daysInMonth) {
      i.style.borderColor = red;
      label.style.color = red;
      small.innerText = "Must be a valid date";
      small.style.fontStyle = "italic";
      validator = false;
    } else {
      i.style.borderColor = grey;
      label.style.color = darkGrey;
      small.innerText = "";
      validator = true;
    }
  });

  return validator;
}
console.log();
function handleSubmit(x) {
  x.preventDefault();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (validate() && validDate()) {
    if (dayInput.value > day) {
      day = day + months[month - 1];
      month = month - 1;
    }
    if (monthInput.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - dayInput.value;
    const m = month - monthInput.value;
    const y = year - yearInput.value;

    dayOutput.innerHTML = d;
    monthOutput.innerHTML = m;
    yearOutput.innerHTML = y;
  }
}
