const body = document.querySelector('body')
const overlay = document.querySelector('.overlay')
const nav = document.querySelector('nav')
const icon = document.querySelector('.icon')
const menu = document.querySelector('.menu')
const dropdown = document.querySelectorAll('.dropdown')
const dropdownList = document.querySelectorAll('.dropdown-list')
const productList = document.querySelector('.product-list')
const up = document.querySelector('.up')
const updateBtn = document.querySelector('.update-btn')
const updateModal = document.querySelector('.update-modal')
const closeModal = document.querySelector('.close-modal')
const moreBtn = document.querySelector('.more-btn')
const modalForm = document.querySelector('.update')
const updateName = document.querySelector('#name')
const updateImg = document.querySelector('#image')
const updateDescription = document.querySelector('#description')
const addImg = document.querySelector('.add-image img')
const addfile = document.querySelector('#add-image')
let page = 3

// ------------------> Nav Start <------------------

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(138, 144, 255, 0.9)'
    }
    else {
        nav.style.background = 'transparent'
    }
})

icon.addEventListener('click', () => {
    if (icon.classList.contains('bx-menu')) {
        menu.classList.add('active')
        overlay.classList.add('active')
        icon.classList.replace('bx-menu', 'bx-x')
    }
    else {
        menu.classList.remove('active')
        overlay.classList.remove('active')
        icon.classList.replace('bx-x', 'bx-menu')
    }
})

dropdown.forEach((element, index) => {
    element.onclick = () => {
        dropdownList.forEach((element2, index2) => {
            if (index == index2) {
                element2.classList.toggle('open')
            }
        })
    }
})

// ------------------> Nav End <------------------

function show() {
    fetch('http://localhost:3000/robots')
        .then(response => response.json())
        .then(data => {
            data.slice(page - 3, page).forEach(item2 => {
                productList.innerHTML += `
                <div class="product">
                        <div class="image">
                            <img src="${item2.url}" alt="">
                        </div>
                        <div class="about">
                            <span>${item2.name}</span>
                            <p>${item2.about}</p>
                            <a href="details.html?id=${item2.id}" class="button">View Details</a>
                            <button class="button" onclick="deleteProduct(${item2.id})">Delete</button>
                            <button class="button" id="update-btn" onclick="updateData(${item2.id})">Update</button>
                    </div>
                </div>`
            })
        })
}

show()

moreBtn.onclick = () => {
    page += 4
    show()
}


function deleteProduct(del) {
    axios.delete(`http://localhost:3000/robots/${del}`)
    window.location.reload()
}



document.onscroll = () => {
    if (window.scrollY > 30) {
        up.classList.add('active')
    }
    else {
        up.classList.remove('active')
    }
}


up.onclick = () => {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
}

updateModal.onclick = (e)=>{
    if(e.target.classList.contains('update-modal')){
        updateModal.classList.remove('active')
    }
}

addfile.onchange = ()=>{
    if(addfile.files[0].type == 'image/jpg' || addfile.files[0].type == 'image/jpeg' || addfile.files[0].type == 'image/png' || addfile.files[0].type == 'image/jwebp'){
        addImg.src = URL.createObjectURL(addfile.files[0])
    }
    else{
        alert("Please choose a photo in JPEG, JPG, PNG, WEBP format")
    }
}

function updateData(id){
    updateModal.classList.add('active')
    modalForm.onsubmit = (e)=>{
        e.preventDefault()
        let reader = new FileReader()
        reader.readAsDataURL(addfile.files[0])
        reader.onload = (e)=>{
            axios.patch(`http://localhost:3000/robots/${id}`, {
                name: updateName.value,
                about: updateDescription.value,
                url: e.target.result
            })
        }
    }
}