interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

const registor: User = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
};

// Ensure the form element is selected correctly
const form = document.querySelector<HTMLFormElement>("[name='formRegistor']")!;
const inputs = form.querySelectorAll<HTMLInputElement>("input");
const submitButton = form.querySelector<HTMLButtonElement>("button");

// Email input change event
inputs[0].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    registor.email = target.value;
    inputs[0].classList.add("success");
  } else {
    inputs[0].classList.add("error");
    inputs[0].nextElementSibling!.innerHTML = "";
  }
});

// Password input change event
inputs[1].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.match(/[A-Z]{1}[a-z]{4}[0-9]{2}/)) {
    registor.password = target.value;
    inputs[1].classList.add("success");
  } else {
    inputs[1].classList.add("error");
    inputs[1].nextElementSibling!.innerHTML = "";
  }
});

// Password confirmation input change event
inputs[2].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (registor.password === target.value) {
    inputs[2].classList.add("success");
  } else {
    inputs[2].classList.add("error");
    inputs[2].nextElementSibling!.innerHTML = "";
  }
});

// First name input change event
inputs[3].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.match(/^[A-Z]/)) {
    registor.firstName = target.value;
    inputs[3].classList.add("success");
  } else {
    inputs[3].classList.add("error");
    inputs[3].nextElementSibling!.innerHTML = "chi ham@nkel";
  }
});

// Last name input change event
inputs[4].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.match(/^[A-Z]/)) {
    registor.lastName = target.value;
    inputs[4].classList.add("success");
  } else {
    inputs[4].classList.add("error");
    inputs[4].nextElementSibling!.innerHTML = "";
  }
});

// Middle name input change event
inputs[5].addEventListener("change", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.match(/^[A-Z]/)) {
    registor.middleName = target.value;
    inputs[5].classList.add("success");
  } else {
    inputs[5].classList.add("error");
    inputs[5].nextElementSibling!.innerHTML = "";
  }
});

// Prevent default form submission
form.addEventListener("submit", (e: Event) => e.preventDefault());

// Handle form submission on button click
submitButton?.addEventListener("click", () => {
  console.log(registor);

  if (
    registor.email &&
    registor.firstName &&
    registor.lastName &&
    registor.middleName &&
    registor.password
  ) {
    fetch("https://api-generator.retool.com/jTwbvX/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registor),
    })
      .then((response) => response.json())
      .then((res) => (window.location.pathname = "singin-singup.html"))
      .catch((error) => console.error(error));
  }
});
