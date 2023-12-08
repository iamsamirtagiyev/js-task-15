
const button = document.querySelector('button')
const productImg = document.querySelector('#file')
const productName = document.querySelector('#name')
const productDescroption = document.querySelector('#description')
const form = document.querySelector('form')

form.onsubmit = (e)=>{
    e.preventDefault()
    if(productImg.value != '' && productDescroption.value != '' && productName.value != ''){
        let obj = {}
        let name = productName.value.trim()
        let description = productDescroption.value.trim()
        let img = productImg.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = (e)=>{
            obj = {
                url: e.target.result,
                name: name,
                about: description
            }
            axios.post('http://localhost:3000/robots', obj)
        }
        window.location= './index.html'
    }
}

