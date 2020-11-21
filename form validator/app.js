const username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  password2 = document.getElementById('password2'),
  form = document.getElementById('form')

// functions
function checkRequired(inputs) {
  let isRequired = false
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getUsername(input)} is required`)
      isRequired = true
    } else {
      showSuccess(input)
    }
  })

  return isRequired
}

function showError(input, message) {
  const formGroup = input.parentElement
  formGroup.className = 'form-group error'
  formGroup.querySelector('small').innerText = message

  //   return true
}

function showSuccess(input) {
  const formGroup = input.parentElement
  formGroup.className = 'form-group success'
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getUsername(input)} should be at least ${min} character`
    )
  } else if (input.value.length > max) {
    showError(
      input,
      `${getUsername(input)} should be less than ${max} character`
    )
  } else {
    showSuccess(input)
  }
}

function getUsername(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function matchPasswrod(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match')
  }
}

function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value) !== true) {
    showError(input, 'Email is not valid')
  }
}

// event listener
form.addEventListener('submit', formClick)
// username.addEventListener('blur', formClick)

function formClick(e) {
  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15)
    checkLength(password, 6, 18)
    validateEmail(email)
    matchPasswrod(password, password2)
  }

  // const formGroup = document.querySelectorAll('.form-group.error')

  // if (!formGroup.length) console.log('No error!!')

  console.log('fadsf')
  e.preventDefault()
}
