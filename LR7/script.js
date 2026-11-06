// Глобальная переменная, куда загрузятся блюда с сервера
let dishes = [];

// Твой рабочий ключ
const API_KEY = '25922801-6ce0-3cfe-8676-fd628bb949f3';

const sections = document.querySelectorAll('.dishes');
const selected = { soup: null, main: null, salad: null, drink: null, dessert: null };
const categoryTitles = { soup: 'Суп', main: 'Главное блюдо', salad: 'Салат/стартер', drink: 'Напиток', dessert: 'Десерт' };

// ===== ЗАГРУЗКА ДАННЫХ С СЕРВЕРА =====
async function loadDishes() {
  try {
    // Используем /my для получения ТВОИХ блюд
    const url = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my?api_key=${API_KEY}`;
    
    console.log("Загружаем меню с сервера...");
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    data.sort((a, b) => a.name.localeCompare(b.name));
    dishes = data;
    
    renderDishes();
    setupFilters();
    
    console.log("✅ Твои данные успешно загружены с сервера!");
    
  } catch (error) {
    console.error("❌ Не удалось загрузить меню:", error);
    document.querySelector('main').innerHTML = `<h2 style="text-align:center; color:red; margin-top: 50px;">Не удалось загрузить меню.<br>Проверьте консоль (F12).</h2>`;
  }
}

// Функция создаёт HTML-карточку блюда
function createCard(dish) {
  const card = document.createElement('div');
  card.classList.add('dish');
  card.dataset.dish = dish.keyword;
  card.dataset.kind = dish.kind;

  // Берем путь к картинке прямо из базы данных (это будет img/soup-1.jpg)
  let imageSrc = dish.image;

  card.innerHTML = `
    <img src="${imageSrc}" alt="${dish.name}">
    <p class="price">${dish.price}₽</p>
    <p class="name">${dish.name}</p>
    <p class="weight">${dish.count}</p>
    <button>Добавить</button>
  `;

  card.addEventListener('click', () => {
    selected[dish.category] = dish;
    renderOrder();
  });

  return card;
}

// Функция выводит все блюда по секциям
function renderDishes() {
  sections.forEach(section => section.innerHTML = '');

  dishes.forEach(dish => {
    const card = createCard(dish);

    let sectionIndex = 0;
    if (dish.category === 'main') sectionIndex = 1;
    if (dish.category === 'salad') sectionIndex = 2;
    if (dish.category === 'drink') sectionIndex = 3;
    if (dish.category === 'dessert') sectionIndex = 4;

    sections[sectionIndex].appendChild(card);
  });
}

// Функция рисует блок "Ваш заказ"
function renderOrder() {
  const orderBlock = document.querySelector('.order-content');
  const totalBlock = document.querySelector('.order-total');

  const chosen = Object.values(selected).filter(dish => dish !== null);

  if (chosen.length === 0) {
    orderBlock.innerHTML = '<p class="empty">Ничего не выбрано</p>';
    totalBlock.style.display = 'none';
    return;
  }

  let html = '';
  ['soup', 'main', 'salad', 'drink', 'dessert'].forEach(category => {
    const dish = selected[category];

    html += `<div class="order-category">`;
    html += `<h4>${categoryTitles[category]}</h4>`;

    if (dish) {
      html += `<p>${dish.name} ${dish.price}₽</p>`;
    } else {
      if (category === 'drink') {
        html += `<p class="not-chosen">Напиток не выбран</p>`;
      } else if (category === 'dessert') {
        html += `<p class="not-chosen">Десерт не выбран</p>`;
      } else {
        html += `<p class="not-chosen">Блюдо не выбрано</p>`;
      }
    }

    html += `</div>`;
  });

  orderBlock.innerHTML = html;

  const total = chosen.reduce((sum, dish) => sum + dish.price, 0);
  totalBlock.innerHTML = `<h4>Стоимость заказа</h4><p class="total-price">${total}₽</p>`;
  totalBlock.style.display = 'block';
}

// Настройка фильтров
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter');

  filterButtons.forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });

  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.kind;
      const section = button.closest('.menu-section');
      const cards = section.querySelectorAll('.dish');
      const sectionButtons = section.querySelectorAll('.filter');
      const isActive = button.classList.contains('active');

      sectionButtons.forEach(btn => btn.classList.remove('active'));

      if (isActive) {
        cards.forEach(card => card.style.display = 'flex');
      } else {
        button.classList.add('active');
        cards.forEach(card => {
          card.style.display = (card.dataset.kind === kind) ? 'flex' : 'none';
        });
      }
    });
  });
}

// ===== ВАЛИДАЦИЯ ФОРМЫ (Задание 6) =====
const orderForm = document.querySelector('.order-form form');

orderForm.addEventListener('submit', (event) => {
    const hasSoup = !!selected.soup;
    const hasMain = !!selected.main;
    const hasSalad = !!selected.salad;
    const hasDrink = !!selected.drink;

    const isValidCombo = 
        (hasSoup && hasMain && hasSalad && hasDrink) ||
        (hasSoup && hasMain && !hasSalad && hasDrink) ||
        (hasSoup && !hasMain && hasSalad && hasDrink) ||
        (!hasSoup && hasMain && hasSalad && hasDrink) ||
        (!hasSoup && hasMain && !hasSalad && hasDrink);

    if (!isValidCombo) {
        event.preventDefault();
        
        let errorMessage = "";

        if (!hasSoup && !hasMain && !hasSalad && !hasDrink) {
            errorMessage = "Ничего не выбрано. Выберите блюда для заказа";
        } 
        else if (hasSoup && !hasMain && !hasSalad) {
            errorMessage = "Выберите главное блюдо/салат/стартер";
        } 
        else if (!hasSoup && !hasMain && hasSalad) {
            errorMessage = "Выберите суп или главное блюдо";
        } 
        else if (!hasSoup && !hasMain && !hasSalad && hasDrink) {
            errorMessage = "Выберите главное блюдо";
        } 
        else if ((hasSoup || hasMain || hasSalad) && !hasDrink) {
            errorMessage = "Выберите напиток";
        }

        showModal(errorMessage);
    }
});

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

    const btn = content.querySelector('.modal-btn');
    btn.addEventListener('click', () => {
        overlay.remove();
    });
}

// ===== ЗАПУСК =====
renderOrder();
loadDishes(); 