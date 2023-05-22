let passwordLength = 16

const elementPassword = document.querySelector("#password")
const copyButton1 = document.querySelector("#copy-1")
const copyButton = document.querySelector("#copy-2")
const renewPassword = document.querySelector("#renew")
const spanNumberLenght = document.querySelector("#password-length-text")
const uperCaseCheckEl = document.querySelector("#uppercase-check")
const numberChartEl = document.querySelector("#number-check")
const simbolChartEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")


function generationPassword() {
    let chars = "abcdefghjklmnpqrstuvxzwy"

    const upperCaseChart = "ABCDEFGHIJKLMNPQRSTUVXWYZ"
    const numberChart = "123456789"
    const simbolChart = "<>][^}{``/+*=-@"

    // inclusao de caracteres
    if (uperCaseCheckEl.checked) {
        chars += upperCaseChart

    }

    if (numberChartEl.checked) {

        chars += numberChart
    }

    if (simbolChartEl.checked) {

        chars += simbolChart
    }
    let password = ""
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    elementPassword.value = password
    calculateQuality()
    calculateFontSize()
}
function calculateQuality() {
    // T*25% + M*P2 +N * P3 +S*P4 =100
    // T*0.25 + M*0.15 +N*0.25 +S*0.35 =100

    const precent = Math.round((passwordLength / 64) * 25 + (uperCaseCheckEl.checked ? 15 : 0) + (numberChartEl.checked ? 25 : 0) + (simbolChartEl.checked ? 35 : 0))
    securityIndicatorBarEl.style.width = `${precent}%`
    if (precent > 69) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
        //safe
    } else if (precent > 50) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
        //warnig
    } else {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
        //critical
    }
    if (precent >= 100) {
        securityIndicatorBarEl.classList.add('completed')
    } else {
        securityIndicatorBarEl.classList.remove('completed')
    }
    console.log(precent)
}

function calculateFontSize() {
    if (passwordLength > 42) {
        console.log(elementPassword)
        console.log(elementPassword.value)
        elementPassword.classList.remove("font-sm")
        elementPassword.classList.remove("font-xs")
        elementPassword.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        elementPassword.classList.remove("font-sm")
        elementPassword.classList.add("font-xs")
        elementPassword.classList.remove("font-xxs")
    } else if (passwordLength > 22) {
        elementPassword.classList.add("font-sm")
        elementPassword.classList.remove("font-xs")
        elementPassword.classList.remove("font-xxs")
    } else {
        elementPassword.classList.remove("font-sm")
        elementPassword.classList.remove("font-xs")
        elementPassword.classList.remove("font-xxs")
    }
}
function copy() {
    navigator.clipboard.writeText(elementPassword.value)
    console.log(elementPassword.value)
}


spanNumberLenght.value = passwordLength

const passwordLengthEl = document.querySelector("#password-length")

passwordLengthEl.addEventListener("input", () => {
    passwordLength = passwordLengthEl.value
    spanNumberLenght.innerText = passwordLength
    generationPassword()

})
uperCaseCheckEl.addEventListener('click', generationPassword)
numberChartEl.addEventListener('click', generationPassword)
simbolChartEl.addEventListener('click', generationPassword)

copyButton.addEventListener("click", copy)
copyButton1.addEventListener("click", copy)
renewPassword.addEventListener("click", generationPassword)
generationPassword()

