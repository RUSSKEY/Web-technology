// Находим все секции с блюдами
const sections = document.querySelectorAll('.dishes');

// Объект для хранения выбранных блюд (по категориям)
const selected = {
  soup: null,
  main: null,
  salad: null,
  drink: null,
  dessert: null
};

// Названия категорий для отображения
const categoryTitles = {
  soup: 'Суп',
  main: 'Главное блюдо',
  salad: 'Салат/стартер',
  drink: 'Напиток',
  dessert: 'Десерт'
};

// Сортируем блюда по алфавиту
dishes.sort((a, b) => a.name.localeCompare(b.name));

// Функция создаёт HTML-карточку блюда
function createCard(dish) {
  const card = document.createElement('div');
  card.classList.add('dish');
  card.dataset.dish = dish.keyword;
  card.dataset.kind = dish.kind;

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
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

// Запускаем всё
renderDishes();
renderOrder();
setupFilters();