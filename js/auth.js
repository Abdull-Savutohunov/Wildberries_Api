const $form = document.querySelector('.form')
const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $file = document.querySelector('.file')
const $btnAuth = document.querySelector('.btnAuth')
const $signOut = document.querySelector('.signOut')

const BASE_URL = 'https://pbasics.pythonanywhere.com/'
// --- /auth/users/ --- регистрация (POST)
// --- /auth/token/login --- авторизация (POST)

const token = localStorage.getItem('accessToken')

window.addEventListener('load', () => {
  if(token){
    open('./index.html', '_self')
  }
})
function getAuth() {
  fetch(`${BASE_URL}auth/token/login/`, {
    method: 'POST',
    body: JSON.stringify({
      username: $username.value.trim(),
      password: $password.value.trim(),
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(res => {
    console.log(res);
    localStorage.setItem('accessToken', res.auth_token)
    open('./index.html', '_self')
  })
  .finally(() => {
    $btnAuth.disabled = false
  })
}
$btnAuth.addEventListener('click', e => {
  e.preventDefault()
  $btnAuth.disabled = true
  getAuth()
})
$signOut.addEventListener('click', e => {
  e.preventDefault()
  window.open('./register.html', '_self')
})


// function formTemplate () {
//   return`
//     <h4 class="text">Autorization</h4>
//     <form class="form">
//       <div>
//         <input type="email" placeholder="Email" class="email">
//       </div>
//       <div>
//           <input type="username" placeholder="Username" class="username">
//         </div>
//       <div>
//         <input type="password" placeholder="Password" class="password">
//       </div>
//       <div>
//         <button class="btnAuth">Autorization</button>
//       </div>
//       <p class="signOut">Создать новый аккаунт</p>
//     </form>
//   `
// }