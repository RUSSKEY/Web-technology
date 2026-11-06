const API_KEY = '25922801-6ce0-3cfe-8676-fd628bb949f3';
let allDishes = []; // Все блюда с сервера
let selected = { soup: null, main: null, salad: null, drink: null, dessert: null };

const categoryTitles = { soup: 'Суп', main: 'Главное блюдо', salad: 'Салат/стартер', drink: 'Напиток', dessert: 'Десерт' };

// Загрузка данных
async function initCheckout() {
    // 1. Получаем ID из LocalStorage
    const saved = localStorage.getItem('selectedDishes');
    if (!saved) {
        showEmptyState();
        return;
    }
    const savedIds = JSON.parse(saved);
    
    // Если вообще ничего не выбрано (все null)
    if (Object.values(savedIds).every(v => v === null)) {
        showEmptyState();
        return;
    }

    try {
        // 2. Загружаем полные данные блюд с сервера
        const url = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my?api_key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки блюд');
        
        allDishes = await response.json();
        
        // 3. Сопоставляем ID с объектами
        Object.keys(savedIds).forEach(cat => {
            if (savedIds[cat]) {
                selected[cat] = allDishes.find(d => d.id === savedIds[cat]) || null;
            }
        });

        // 4. Отрисовываем страницу
        renderCheckoutPage();
        
    } catch (error) {
        console.error("Ошибка:", error);
        document.getElementById('empty-message').innerHTML = "Ошибка загрузки данных. Проверьте консоль.";
        document.getElementById('empty-message').style.display = 'block';
    }
}

function showEmptyState() {
    document.getElementById('empty-message').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('checkout-dishes').style.display = 'none';
}

function renderCheckoutPage() {
    const chosen = Object.values(selected).filter(d => d !== null);
    
    if (chosen.length === 0) {
        showEmptyState();
        return;
    }

    // Показываем форму
    document.getElementById('empty-message').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
    const dishesContainer = document.getElementById('checkout-dishes');
    dishesContainer.style.display = 'grid';

    // Отрисовка карточек "Состав заказа"
    dishesContainer.innerHTML = '';
    chosen.forEach(dish => {
        const card = document.createElement('div');
        card.classList.add('dish');
        // Берем картинку
        let imageSrc = dish.image;
        if (imageSrc.startsWith('images/')) {
            imageSrc = 'https://web-basics-api-gagashaggy.msk1.amvera.tech/' + imageSrc;
        }

        card.innerHTML = `
            <img src="${imageSrc}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Удалить</button>
        `;

        card.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            removeDish(dish.category);
        });

        dishesContainer.appendChild(card);
    });

    renderFormSummary();
}

function renderFormSummary() {
    const contentBlock = document.getElementById('form-order-content');
    const totalBlock = document.getElementById('form-order-total');
    let html = '';
    let total = 0;

    ['soup', 'main', 'salad', 'drink', 'dessert'].forEach(cat => {
        const dish = selected[cat];
        html += `<div class="order-category">`;
        html += `<h4>${categoryTitles[cat]}</h4>`;
        
        if (dish) {
            html += `<p>${dish.name} ${dish.price}₽</p>`;
            total += dish.price;
        } else {
            if (cat === 'drink') html += `<p class="not-chosen">Напиток не выбран</p>`;
            else if (cat === 'dessert') html += `<p class="not-chosen">Десерт не выбран</p>`;
            else html += `<p class="not-chosen">Блюдо не выбрано</p>`;
        }
        html += `</div>`;
    });

    contentBlock.innerHTML = html;
    totalBlock.innerHTML = `<h4>Стоимость заказа</h4><p class="total-price">${total}₽</p>`;
}

function removeDish(category) {
    selected[category] = null;
    
    // Сохраняем в LocalStorage
    const toSave = {};
    Object.keys(selected).forEach(cat => {
        toSave[cat] = selected[cat] ? selected[cat].id : null;
    });
    localStorage.setItem('selectedDishes', JSON.stringify(toSave));

    // Перерисовываем
    renderCheckoutPage();
}

// Проверка валидности комбо
function isValidCombo() {
    const hasSoup = !!selected.soup;
    const hasMain = !!selected.main;
    const hasSalad = !!selected.salad;
    const hasDrink = !!selected.drink;

    return (hasSoup && hasMain && hasSalad && hasDrink) ||
           (hasSoup && hasMain && !hasSalad && hasDrink) ||
           (hasSoup && !hasMain && hasSalad && hasDrink) ||
           (!hasSoup && hasMain && hasSalad && hasDrink) ||
           (!hasSoup && hasMain && !hasSalad && hasDrink);
}

// Обработка радиокнопок времени
document.querySelectorAll('input[name="delivery-type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const timeInput = document.getElementById('time');
        if (e.target.value === 'at-time') {
            timeInput.disabled = false;
            timeInput.required = true;
        } else {
            timeInput.disabled = true;
            timeInput.required = false;
            timeInput.value = '';
        }
    });
});

// Кнопка "Сбросить"
document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm("Вы уверены, что хотите очистить заказ?")) {
        localStorage.removeItem('selectedDishes');
        window.location.href = 'menu.html';
    }
});

// Отправка формы
document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Проверка на соответствие комбо
    if (!isValidCombo()) {
        showModal("Выбранный набор блюд не соответствует ни одному из доступных комбо. Пожалуйста, вернитесь на страницу 'Собрать ланч' и измените заказ.");
        return;
    }

    // 2. Сбор данных
    const deliveryType = document.querySelector('input[name="delivery-type"]:checked').value;
    const payload = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subscribe: document.getElementById('subscribe').checked ? 1 : 0,
        phone: document.getElementById('phone').value,
        delivery_address: document.getElementById('address').value,
        delivery_type: deliveryType === 'asap' ? 'now' : 'by_time',
        comment: document.getElementById('comment').value,
        soup_id: selected.soup ? selected.soup.id : null,
        main_course_id: selected.main ? selected.main.id : null,
        salad_id: selected.salad ? selected.salad.id : null,
        drink_id: selected.drink ? selected.drink.id : null,
        dessert_id: selected.dessert ? selected.dessert.id : null
    };

    if (deliveryType === 'at-time') {
        payload.delivery_time = document.getElementById('time').value;
    }

    // 3. Отправка на сервер
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    try {
        const url = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/orders?api_key=${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Ошибка сервера');
        }

        // Успех
        localStorage.removeItem('selectedDishes');
        showModal("Заказ успешно оформлен! Спасибо за покупку.");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error(error);
        showModal(`Не удалось оформить заказ: ${error.message}`);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Простая модалка
function showModal(text) {
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    const content = document.createElement('div');
    content.classList.add('modal-content');
    content.innerHTML = `
        <p>${text}</p>
        <button class="modal-btn">Окей 👌</button>
    `;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    content.querySelector('.modal-btn').addEventListener('click', () => overlay.remove());
}

// Запуск
initCheckout();