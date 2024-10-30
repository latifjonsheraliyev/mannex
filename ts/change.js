"use strict";
const registor = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
};
// Ensure the form element is correctly selected and exists
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const submitBtn = form.querySelector("button");
// Handle changes for input[0] (Email)
inputs[0].addEventListener("change", (event) => {
    const target = event.target;
    if (target.value) {
        registor.email = target.value;
        inputs[0].classList.add("success");
    }
    else {
        inputs[0].classList.add("error");
        inputs[0].nextElementSibling.innerHTML = "";
    }
});
// Handle changes for input[1] (Password)
inputs[1].addEventListener("change", (event) => {
    const target = event.target;
    if (target.value.match(/[A-Z]{1}[a-z]{4}[0-9]{2}/)) {
        registor.password = target.value;
        inputs[1].classList.add("success");
        console.log(registor.password);
    }
    else {
        inputs[1].classList.add("error");
        inputs[1].nextElementSibling.innerHTML = "";
    }
});
// Handle changes for input[2] (Password Confirmation)
inputs[2].addEventListener("change", (event) => {
    const target = event.target;
    if (registor.password === target.value) {
        inputs[2].classList.add("success");
    }
    else {
        inputs[2].classList.add("error");
        inputs[2].nextElementSibling.innerHTML = "";
    }
});
// Handle changes for input[3] (First Name)
inputs[3].addEventListener("change", (event) => {
    const target = event.target;
    if (target.value.match(/^[A-Z]/)) {
        registor.firstName = target.value;
        inputs[3].classList.add("success");
    }
    else {
        inputs[3].classList.add("error");
        inputs[3].nextElementSibling.innerHTML = "chi ham@nkel";
    }
});
// Handle changes for input[4] (Last Name)
inputs[4].addEventListener("change", (event) => {
    const target = event.target;
    if (target.value.match(/^[A-Z]/)) {
        registor.lastName = target.value;
        inputs[4].classList.add("success");
    }
    else {
        inputs[4].classList.add("error");
        inputs[4].nextElementSibling.innerHTML = "";
    }
});
// Handle changes for input[5] (Middle Name)
inputs[5].addEventListener("change", (event) => {
    const target = event.target;
    if (target.value.match(/^[A-Z]/)) {
        registor.middleName = target.value;
        inputs[5].classList.add("success");
    }
    else {
        inputs[5].classList.add("error");
        inputs[5].nextElementSibling.innerHTML = "";
    }
});
// Prevent form submission
form.addEventListener("submit", (e) => e.preventDefault());
// Handle form submission and data update
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", () => {
    var _a;
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? (_a = JSON.parse(storedUser).id) !== null && _a !== void 0 ? _a : null : null;
    if (registor.email &&
        registor.firstName &&
        registor.lastName &&
        registor.middleName &&
        registor.password) {
        fetch(`https://api-generator.retool.com/jTwbvX/data/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registor),
        })
            .then((response) => response.json())
            .then((res) => localStorage.setItem("user", JSON.stringify(res)))
            .catch((er) => console.error(er));
    }
});
//# sourceMappingURL=change.js.map