const form = document.form 
const url = 'https://api-generator.retool.com/jTwbvX/data'

function sendRequest() {
    fetch(url)
    .then(response => response.json())
    .then(user => user.filter(user =>user.email === form[0].value))
    .then(response => {
        console.log(response);
        localStorage.setItem('user',JSON.stringify(response[0]))
          if(localStorage.hasOwnProperty('user')) {
     window.location.pathname='myinfo.html'
     }
    }
    )
   
}
form.addEventListener('submit',event => event.preventDefault())
form[2].addEventListener('click',sendRequest)
