// Находим все секции с блюдами
const sections = document.querySelectorAll('.dishes');

// Объект для хранения выбранных блюд (по категориям)
const selected = {
  soup: null,
  main: null,
  drink: null
};

// Названия категорий для отображения
const categoryTitles = {
  soup: 'Суп',
  main: 'Главное блюдо',
  drink: 'Напиток'
};

// Сортируем блюда по алфавиту
dishes.sort((a, b) => a.name.localeCompare(b.name));

// Функция создаёт HTML-карточку блюда
function createCard(dish) {
  const card = document.createElement('div');
  card.classList.add('dish');
  card.dataset.dish = dish.keyword;

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <p class="price">${dish.price}₽</p>
    <p class="name">${dish.name}</p>
    <p class="weight">${dish.count}</p>
    <button>Добавить</button>
  `;

  // Клик по карточке — добавляем блюдо в заказ
  card.addEventListener('click', () => {
    selected[dish.category] = dish;
    renderOrder();
  });

  return card;
}

// Функция выводит все блюда по секциям
function renderDishes() {
  // Очищаем секции от старого содержимого
  sections.forEach(section => section.innerHTML = '');

  // Пробегаемся по всем блюдам
  dishes.forEach(dish => {
    const card = createCard(dish);

    // Находим нужную секцию по категории
    // Секции идут в порядке: суп (0), главное (1), напиток (2)
    let sectionIndex = 0;
    if (dish.category === 'main') sectionIndex = 1;
    if (dish.category === 'drink') sectionIndex = 2;

    sections[sectionIndex].appendChild(card);
  });
}

// Функция рисует блок "Ваш заказ"
function renderOrder() {
  const orderBlock = document.querySelector('.order-content');
  const totalBlock = document.querySelector('.order-total');

  const chosen = Object.values(selected).filter(dish => dish !== null);

  // Если ничего не выбрано — показываем "Ничего не выбрано"
  if (chosen.length === 0) {
    orderBlock.innerHTML = '<p class="empty">Ничего не выбрано</p>';
    totalBlock.style.display = 'none';
    return;
  }

  // Формируем HTML для выбранных блюд
  let html = '';
  ['soup', 'main', 'drink'].forEach(category => {
    const dish = selected[category];

    html += `<div class="order-category">`;
    html += `<h4>${categoryTitles[category]}</h4>`;

    if (dish) {
      html += `<p>${dish.name} ${dish.price}₽</p>`;
    } else {
      // Если в категории ничего не выбрано
      if (category === 'drink') {
        html += `<p class="not-chosen">Напиток не выбран</p>`;
      } else {
        html += `<p class="not-chosen">Блюдо не выбрано</p>`;
      }
    }

    html += `</div>`;
  });

  orderBlock.innerHTML = html;

  // Считаем итоговую стоимость
  const total = chosen.reduce((sum, dish) => sum + dish.price, 0);
  totalBlock.innerHTML = `<h4>Стоимость заказа</h4><p class="total-price">${total}₽</p>`;
  totalBlock.style.display = 'block';
}

// Запускаем всё
renderDishes();
renderOrder();