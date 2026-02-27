const hour = document.getElementById('clock-hour')
const minutes = document.getElementById('clock-minutes')
const seconds = document.getElementById('clock-seconds')

const textHour = document.getElementById('text-hour')
const textMinutes = document.getElementById('text-minutes')
const textAmPm = document.getElementById('text-ampm')
const dateDay = document.getElementById('date-day')
const dateMonth = document.getElementById('date-month')
const dateYear = document.getElementById('date-year')

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const updateClock = () => {
    const now = new Date()

    const ms = now.getMilliseconds()
    const sec = now.getSeconds() + ms / 1000
    const min = now.getMinutes() + sec / 60
    const hr = now.getHours() + min / 60

    const secDeg = sec * 6
    const minDeg = min * 6
    const hrDeg = hr * 30

    hour.style.transform = `rotateZ(${hrDeg}deg)`
    minutes.style.transform = `rotateZ(${minDeg}deg)`
    seconds.style.transform = `rotateZ(${secDeg}deg)`

    let displayHour = now.getHours()
    let ampm = displayHour >= 12 ? 'PM' : 'AM'

    displayHour = displayHour % 12
    displayHour = displayHour ? displayHour : 12

    let displayMin = now.getMinutes()

    if (displayHour < 10) displayHour = `0${displayHour}`
    if (displayMin < 10) displayMin = `0${displayMin}`

    textHour.innerHTML = `${displayHour}:`
    textMinutes.innerHTML = displayMin
    textAmPm.innerHTML = ampm

    dateDay.innerHTML = now.getDate()
    dateMonth.innerHTML = `${months[now.getMonth()]},`
    dateYear.innerHTML = now.getFullYear()

    requestAnimationFrame(updateClock)
}

updateClock()

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light'

const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})