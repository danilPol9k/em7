window.onload = function () {
    const productId = localStorage.getItem('productId');
    const productData = catalog.find((product) => product.id === productId);
    if (productData) {
        renderProductCard(productData);
    } else {
        console.error('Данные о товаре не найдены');
    }
};

function renderProductCard(productData) {
    const productCardHtml = `
       <p class="current-page"><a href="/index.html">Главная </a> / <a href="/pages/products.html">
Продукты</a>
/ <span class="current-page--current">
${productData.name}</span></p>
    <div class="first-swiper-container">
<div class="swiper mySwiper2">
<div class="swiper-wrapper">
<div class="swiper-slide">
<img src="${productData.frontImg}" />
</div>
<div class="swiper-slide">
<img src="${productData.img2}" />
</div>
<div class="swiper-slide">
<img src="${productData.img3}" />
</div>
<div class="swiper-slide">
<img src="${productData.img4}" />
</div>
<div class="swiper-slide">
<img src="${productData.img5}" />
</div>
<div class="swiper-slide">
<img src="${productData.img6}" />
</div>
</div>
</div>
</div>
<div thumbsSlider="" class="swiper mySwiper">
<div class="swiper-wrapper">
<div class="swiper-slide">
<img src="${productData.frontImg}" />
</div>
<div class="swiper-slide">
<img src="${productData.img2}" />
</div>
<div class="swiper-slide">
<img src="${productData.img3}" />
</div>
<div class="swiper-slide">
<img src="${productData.img4}" />
</div>
<div class="swiper-slide">
<img src="${productData.img5}" />
</div>
<div class="swiper-slide">
<img src="${productData.img6}" />
</div>
</div>
</div>
<div class="product-page-wrapper">
<h3 class="product-page__title">${productData.name}</h3>
<span class="product-page__model">Модели</span>
<div class="product-page__btn-wrap">
<button class="product-page__btn">IPhone 15</button>
<button class="product-page__btn">IPhone 15 Plus</button>
<button class="product-page__btn">IPhone 15 Pro</button>
<button class="product-page__btn">IPhone 15 Pro Max</button>
</div>
<span class="product-page__model">Цвета</span>
<div class="product-page__color-wrap">
<a class="product-page__color"><img src="/images/Frame 5838.png" alt=""
class="product-page__color-btn"></a>
<a class="product-page__color"><img src="/images/Frame 5697.png" alt=""
class="product-page__color-btn"></a>
</div>
<div class="product-page__info-wrapper">
<div class="product-page__info-wrap">
<p class="product-page__info-text">О товаре</p>
<img src="/images/Polygon1.png" alt="" class="product-page__info-img">
</div>
<div class="product-page__info-text__drop">
${productData.desc}
</div>
<div class="product-page__info-underline"></div>
</div>
<div class="product-page__spec-wrapper">
<div class="product-page__spec-wrap">
<p class="product-page__spec-text">Характеристики</p>
<img src="/images/Polygon1.png" alt="" class="product-page__spec-img">
</div>
<div class="product-page__info-spec__drop">
<p class="product-page__info-spec__drop-text">Вид
чехла......................................................<span
class="product-page__info-spec__drop-text--spec">Бампер</span></p>
<p class="product-page__info-spec__drop-text">
Материал.......................................................<span
class="product-page__info-spec__drop-text--spec">Пластик</span></p>
<p class="product-page__info-spec__drop-text">
Цвет..................................................................<span
class="product-page__info-spec__drop-text--spec">Прозрачный</span></p>
<p class="product-page__info-spec__drop-text">
Особенности................................................<span
class="product-page__info-spec__drop-text--spec">MagSafe, Противоударный, Защита
камеры и экрана</span></p>
<p class="product-page__info-spec__drop-text">
Совместимость...........................................<span
class="product-page__info-spec__drop-text--spec">${productData.model}</span></p>
</div>
<div class="product-page__info-underline"></div>
</div>
<div class="product-page__link-block">
<div class="product-page__link-block-container">
<span class="product-page__link-block__buy">Купить</span>
<div class="product-page__link-block__btn-wrap">
<a href="${catalog.linkOzon}" class="product-page__link-block__btn">Ozon</a>
<a href="${catalog.linkYa}" class="product-page__link-block__btn">Яндекс Маркет</a>
<a href="" class="product-page__link-block__btn">Оптом</a>
</div>
</div>
</div>
</div>
    `;

    const productCardContainer = document.getElementById('product-card-container');
    if (productCardContainer) {
        productCardContainer.innerHTML = productCardHtml;
    }

    const modelButtons = document.querySelectorAll('.product-page__btn');

    modelButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modelButtons.forEach((btn) => {
                btn.classList.remove('--active');
            });
            event.target.classList.add('--active');

            const model = event.target.textContent;
            const filteredCatalog = catalog.filter((product) => product.model === model);

            if (filteredCatalog.length > 0) {
                const productData = filteredCatalog[0];
                renderProductCard(productData);
            }
        });
    });

    const colorButtons = document.querySelectorAll('.product-page__color');

    colorButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            console.log('Кнопка цвета кликнута:', index);
            console.log('Массив catalog:', catalog);
            console.log('Модель продукта:', catalog[index].model);

            colorButtons.forEach((btn) => {
                btn.classList.remove('--active');
            });
            event.target.classList.add('--active');

            const model = catalog[index].model;
            const filteredCatalog = catalog.filter((product) => product.model === model && product.color === 'black');

            if (filteredCatalog.length > 0) {
                const productData = filteredCatalog[0];
                console.log('Данные продукта:', productData);
                renderProductCard(productData);
            }
        });
    });

    const swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    const swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    })

    const button = document.querySelector('.product-page__info-wrap')
    const img = document.querySelector('.product-page__info-img')
    const drop = document.querySelector('.product-page__info-text__drop')
    const button2 = document.querySelector('.product-page__spec-wrap')
    const img2 = document.querySelector('.product-page__spec-img')
    const drop2 = document.querySelector('.product-page__info-spec__drop')

    button.addEventListener('click', function () {
        if (drop.style.display === 'none' || drop.style.display === '') {
            drop.style.display = 'block'
            img.style.transform = 'rotate(180deg)'
        } else {
            img.style.transform = 'rotate(0deg)'
            drop.style.display = 'none'
        }
    })

    button2.addEventListener('click', function () {
        if (drop2.style.display === 'none' || drop2.style.display === '') {
            drop2.style.display = 'block'
            img2.style.transform = 'rotate(180deg)'
        } else {
            img2.style.transform = 'rotate(0deg)'
            drop2.style.display = 'none'
        }
    })
}
