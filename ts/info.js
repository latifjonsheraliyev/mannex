"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.forms[0]; // Access the first form directly
const url = 'https://api-generator.retool.com/jTwbvX/data';
// Function to send the request and handle user authentication
function sendRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const users = yield response.json();
            // Filter user based on the entered email
            const user = users.find((user) => user.email === form[0].value);
            if (user) {
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                // Check if user is saved and redirect
                if (localStorage.getItem('user')) {
                    window.location.pathname = 'myinfo.html';
                }
            }
            else {
                console.error('User not found');
                alert('Invalid email or user does not exist.');
            }
        }
        catch (error) {
            console.error('Error fetching user:', error);
        }
    });
}
// Prevent form submission and handle button click to send the request
form.addEventListener('submit', (event) => event.preventDefault());
form[2].addEventListener('click', sendRequest);
//# sourceMappingURL=info.js.map