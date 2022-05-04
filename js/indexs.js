const $title = document.querySelector('.title')
const $description = document.querySelector('.description')
const $price = document.querySelector('.price')
const $image_url = document.querySelector('.image_url')
const $category = document.querySelector('.category')
const $submit = document.querySelector('.submit')
const $container = document.querySelector('.row')
const $loader = document.querySelector('.loader')
const $signOut = document.querySelector('.signout_btn')

const allInputs = document.querySelector('.form div input')


const base = 'https://pbasics.pythonanywhere.com'
const accessToken = localStorage.getItem('accessToken')
function requestHeaders(accessToken) {
  return {
    'Content-type': 'application/json',
    'Authorization': `Token ${accessToken}`
  }
}
const request = {
  get: (url, accessToken) => {
    return fetch(url, {
      method: 'GET',
      headers: requestHeaders(accessToken),
    })
  },
  post:(url, accessToken, body) => {
    return fetch(url, {
      method: 'POST',
      headers:requestHeaders(accessToken),
      body:JSON.stringify(body),
    })
    .then(res => res.json())
    
  },
  delete:(url, accessToken) => {
    return fetch(url, {
      method:'DELETE',
      headers:requestHeaders(accessToken),
    })
    .then(res => res.json())
  },
}
// .....................Render products when window loaded............................................
window.addEventListener('load', () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    window.open('../auth.html', '_self')
  }
  $loader.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`

  getProducts()
})

// ..................... Get Products ............................................
function getProducts() {
  request.get(`${base}/products/`, accessToken)
    .then(res => res.json())
    .then(r => {
      const products = r
      const res = products.reverse().map(todo => cardTemplate(todo)).join('')
      $container.innerHTML = res
    })

}
// ..................... Create Products............................................
function createProduts(title, price, description, image_url, category) {
  request.post(`${base}/products/create/`, accessToken, {title, price, description, image_url, category})
  $submit.disabled = true
}
// ..................... Card Template ............................................
function cardTemplate({ title, description, price, image_url, category, id}) {
  return `
    <div class="cards">
      <div class="cards_header">
        <h3 class="card_title">${title}</h3>
      </div>
      <div>
        <img class="cards_img" src="${image_url}"/>
      </div>
      <div class="card_body content">
        <p>${description}</p>
        <span class="time">
          ${price}
          ${category}
        </span>
      </div>
      <div class="card-footer">
        <button class="delete" onclick="deleteProduct('${id}')">Delete</button>
        <button class="edit" onclick="editProduct('${id}')">Edit</button>
      </div>
    </div>
  `
}
//  ..................... Delete todo ............................................
function deleteProduct(id) {
  fetch(`${base}/products/delete/${id}`, {
    method: 'DELETE',
    headers: requestHeaders(accessToken),
  })
  .then(getProducts)
}
// ..................... Edit todo ............................................
function editProduct(id) {
  const askTitle = prompt('New title')
  const askPrise = +prompt('New price')
  const askDescription = prompt('New description')
  const askImage = prompt('New image')
  const askCategory = +prompt('New category')
  fetch(`${base}/products/update/${id}`, {
    method: 'PATCH',
    headers: requestHeaders(accessToken),
    body: JSON.stringify({
      title: askTitle,
      price: askPrise ,
      description: askDescription ,
      image_url: askImage,
      category: askCategory ,
    })
  })
  .then(getProducts)
}
$submit.addEventListener('click', e => {
  e.preventDefault()
  $submit.disabled = true
  createProduts($title.value, $price.value,$description.value, $image_url.value, $category.value)
})
// ..................... Sign Out ............................................
$signOut.addEventListener('click', e => {
  e.preventDefault()
  const refreshToken = localStorage.getItem('refreshToken')
  $signOut.disabled = true
  $signOut.classList.add('disabled')
  fetch(`${base}/auth/token/logout/`, {
    method: 'POST',
    headers: requestHeaders(''),
    body: JSON.stringify({ refreshToken })
  })
    .then(res => res.json())
    .then(() => {
      localStorage.clear()
      window.open('../auth.html', '_self')
    })
    .finally(() => {
      $signOut.disabled = false
      $signOut.classList.remove('disabled')
    })
})