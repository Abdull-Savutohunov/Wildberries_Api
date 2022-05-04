const $form = document.querySelector('.form')
const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $file = document.querySelector('.file')
const $btnReg = document.querySelector('.btnReg')
const $signIn = document.querySelector('.signIn')
const BASE_URL = 'https://pbasics.pythonanywhere.com'

// --- /auth/users/ --- регистрация (POST)
// --- /auth/token/login --- авторизация (POST)


function getRegister() {
  fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST',
    body: JSON.stringify({
      username: $username.value.trim(),
      password: $password.value.trim(),
      email: $email.value.trim()
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(r => r.json())
    .then(window.open('../auth.html', '_self'))
    .finally(() => {
      $btnReg.disabled = false
    })
}
$btnReg.addEventListener('click', e => {
  e.preventDefault()
  $btnReg.disabled = true
  getRegister()
})
window.addEventListener('load', () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    window.open('./auth.html', '_self')
  }
})
$signIn.addEventListener('click', e => {
  e.preventDefault()

  window.open('./auth.html', '_self')
})

