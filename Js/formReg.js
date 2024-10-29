const registor = {
    email:"",
    password:"",  
    firstName: "",
    lastName:"", 
    middleName:"",
  
  }
   
  const form = document.formRegistor;
  form[0].addEventListener("change",event=>{   
    if( event.target.value){
      registor.email = event.target.value
    form[0].classList.add("success")
  }else{
    form[0].classList.add("error")
    form[0].nextElementSibling.innerHTML=""
  }

  })
  form[1].addEventListener("change",event=>{
    if(event.target.value.match(/[A-Z]{1}[a-z]{4}[0-9]{2}/)){
      registor.password = event.target.value;
      form[1].classList.add("success")

    }else{
      form[1].classList.add("error")
      form[1].nextElementSibling.innerHTML=""
    }
  })
  form[2].addEventListener("change",event=>{
    if(registor.password=== event.target.value){
      form[2].classList.add("success")
    }else{
      form[2].classList.add("error")
      form[2].nextElementSibling.innerHTML="" 
    }
  })
  form[3].addEventListener("change",event=>{
    if(event.target.value.match(/^[A-Z]/)){
      registor.firstName = event.target.value;
      form[3].classList.add("success")
    }else{
      form[3].classList.add("error")
      form[3].nextElementSibling.innerHTML="chi ham@nkel"
    }
  })
  form[4].addEventListener("change",event=>{
    if(event.target.value.match(/^[A-Z]/)){
      registor.lastName = event.target.value;
      form[4].classList.add("success")
    }else{
      form[4].classList.add("error")
      form[4].nextElementSibling.innerHTML=""
    }
  })
  form[5].addEventListener("change",event=>{
    if(event.target.value.match(/^[A-Z]/)){
      registor.middleName = event.target.value;
      form[5].classList.add("success")
    }else{
      form[5].classList.add("error")
      form[5].nextElementSibling.innerHTML=""
    }
  })
  form.addEventListener("submit",e => e.preventDefault());
  form[6].addEventListener("click", function (){
      console.log(registor);
    if(registor?.email && registor?.firstName && registor?.lastName && registor?.middleName && registor?.password){
      fetch("https://api-generator.retool.com/jTwbvX/data",{
      
        method:'POST',
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body: JSON.stringify(registor)
      })
      .then(response => response.json())
      .then(res=> window.location.pathname='singin-singup.html')
      .catch(er => console.error(er))
    
  }
  })   
