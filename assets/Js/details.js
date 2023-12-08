
const detailsWrapper = document.querySelector('.details-wrapper')
let id = new URLSearchParams(window.location.search).get("id")

fetch(`http://localhost:3000/robots/${id}`)
.then(response => response.json())
.then(data =>{
    console.log(data);
    detailsWrapper.innerHTML += `
    <div class="left">
                    <img src="${data.url}">
                </div>
                <div class="right">
                    <h1>${data.name}</h1>
                    <span>${data.about}</span>
                    <button>Delete</button>
                </div>`
})