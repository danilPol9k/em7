window.onload = function () {
    const limit = 15;
    const totalPages = Math.ceil(catalog.length / limit);
    let currentPage = 1;
    let filters = {
        type: [],
        model: []
    };

    const productsBlockWrapper = document.querySelector('.products-blocks-wrapper');
    const prevBtn = document.querySelector('.products-btn__prev');
    const nextBtn = document.querySelector('.products-btn__next');
    const pageBtns = document.querySelectorAll('.page-btn');
    const typeFilters = document.querySelectorAll('.inputs-wrap input[type="checkbox"].type-filter');
    const modelFilters = document.querySelectorAll('.inputs-wrap input[type="checkbox"].model-filter');

    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    pageBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.getAttribute('data-page'));
            renderProducts();
        });
    });

    typeFilters.forEach((filter) => {
        filter.addEventListener('change', () => {
            const filterValue = filter.nextElementSibling.textContent;
            if (filter.checked) {
                filters.type.push(filterValue);
            } else {
                filters.type = filters.type.filter((value) => value !== filterValue);
            }
            renderProducts();
        });
    });

    modelFilters.forEach((filter) => {
        filter.addEventListener('change', () => {
            const filterValue = filter.nextElementSibling.textContent;
            if (filter.checked) {
                filters.model.push(filterValue);
            } else {
                filters.model = filters.model.filter((value) => value !== filterValue);
            }
            renderProducts();
        });
    });

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    }

    function renderProducts() {
        productsBlockWrapper.innerHTML = '';

        let html = '';
        const filteredCatalog = catalog.filter((product) => {
            const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
            const modelMatch = filters.model.length === 0 || filters.model.includes(product.model);
            return typeMatch && modelMatch;
        });
        const paginatedCatalog = filteredCatalog.slice((currentPage - 1) * limit, currentPage * limit);
        paginatedCatalog.forEach((product) => {
            html += `
                <a class="product-block" data-id="${product.id}" data-product="${JSON.stringify(product)}">
                  <div class="product-block__img-back">
                    <img src="${product.frontImg}" alt="" class="product-block__img">
                  </div>
                  <h5 class="product-block__name">${product.name}</h5>
                  <p class="product-block__model">${product.model}</p>
                </a>
              `;
        });

        productsBlockWrapper.innerHTML = html;

        const productBlocks = document.querySelectorAll('.product-block');
        productBlocks.forEach((productBlock) => {
            productBlock.addEventListener('click', (event) => {
                const productId = event.target.closest('.product-block').getAttribute('data-id');
                localStorage.setItem('productId', productId);
                window.location.href = '/pages/productPage.html';
            });
        });
    }

    renderProducts();


    const filterOpen = document.querySelector('.filter-wrap')
    const filterClose = document.querySelector('.filters-check__btn-close')
    const filterMenu = document.querySelector('.filters-check-wrapper')

    filterOpen.addEventListener('click', function () {
        if (filterMenu.style.display === 'none' || filterMenu.style.display === '') {
            filterMenu.style.display = 'block'
            filterClose.style.display = 'block'
        }
    })

    filterClose.addEventListener('click', function () {
        filterMenu.style.display = 'none'
        filterClose.style.display = 'none'
    })

    const mediaQuery = window.matchMedia(`(min-width: 939px)`)

    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            filterMenu.style.display = 'block'
        } else {
            filterMenu.style.display = 'none'
        }
    })

};


document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropbtn.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});