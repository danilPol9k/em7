const menuToggle = document.querySelector('.menu-toggle')
const menuList = document.querySelector('.burger-wrapper')

menuToggle.addEventListener('click', function () {
    if (menuList.style.display === 'none' || menuList.style.display === '') {
        menuList.style.display = 'block'
        menuToggle.style.backgroundImage = "url(/images/close.png)"
    } else {
        menuList.style.display = 'none'
        menuToggle.style.backgroundImage = "url(/images/burger.png)"
    }
})