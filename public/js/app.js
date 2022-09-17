console.log('Running');

// fetch('https://puzzle.mead.io/puzzle').then(function(response) {
//     response.json().then((data)=>{
//       console.log(data);
//     })
// });



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const location = search.value;
    console.log(location);
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?latitude=28&longitude=77').then(function(response) {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error
        }else{
            console.log(data.location);
            console.log(data.address);
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
     
    })
});
});