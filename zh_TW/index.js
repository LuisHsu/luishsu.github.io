function bodyClick() {
    document.getElementById('WelcomeMask').style.display = 'none'
    document.body.removeEventListener("click", bodyClick)
}
function load() {
    document.body.addEventListener("click", bodyClick)
}
function navClick() {

}
