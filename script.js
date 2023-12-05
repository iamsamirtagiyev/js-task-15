const body = document.querySelector('body')
const overlay = document.querySelector('.overlay')
const nav = document.querySelector('nav')
const icon = document.querySelector('.icon')
const menu = document.querySelector('.menu')
const dropdown = document.querySelectorAll('.dropdown')
const dropdownList = document.querySelectorAll('.dropdown-list')
const productList = document.querySelector('.product-list')

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

fetch('http://localhost:3000/robots')
    .then(response => response.json())
    .then(data => {
        data.forEach(item2 => {
            productList.innerHTML += `
                <div class="product">
                        <div class="image">
                            <img src="${item2.url}" alt="">
                        </div>
                        <div class="about">
                            <span>${item2.name}</span>
                            <p>${item2.about}</p>
                            <a href="details.html?id=${item2.id}" class="button">View Details</a>
                    </div>
                </div>`
        })
    })