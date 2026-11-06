// Глобальная переменная, куда загрузятся блюда с сервера
let dishes = [];
const API_KEY = '25922801-6ce0-3cfe-8676-fd628bb949f3';
const sections = document.querySelectorAll('.dishes');

// Объект для хранения выбранных блюд
const selected = { soup: null, main: null, salad: null, drink: null, dessert: null };
const categoryTitles = { soup: 'Суп', main: 'Главное блюдо', salad: 'Салат/стартер', drink: 'Напиток', dessert: 'Десерт' };

// Загрузка выбранных блюд из LocalStorage (если они там есть)
function loadSelectedFromStorage() {
    const saved = localStorage.getItem('selectedDishes');
    if (saved) {
        const savedData = JSON.parse(saved);
        // Восстанавливаем объекты (нам нужны только ID для сохранения, но для UI нужны полные объекты, поэтому мы их найдем после загрузки dishes)
        Object.keys(savedData).forEach(cat => {
            if (savedData[cat]) {
                selected[cat] = savedData[cat]; // Сохраняем ID
            }
        });
    }
}

// Сохранение в LocalStorage (только ID)
function saveSelectedToStorage() {
    const toSave = {};
    Object.keys(selected).forEach(cat => {
        if (selected[cat]) {
            toSave[cat] = selected[cat].id; // Сохраняем только ID блюда
        } else {
            toSave[cat] = null;
        }
    });
    localStorage.setItem('selectedDishes', JSON.stringify(toSave));
}

// Загрузка данных с сервера
async function loadDishes() {
  try {
    const url = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    
    const data = await response.json();
    data.sort((a, b) => a.name.localeCompare(b.name));
    dishes = data;
    
    // Восстанавливаем выбранные блюда после загрузки
    loadSelectedFromStorage();
    
    // Теперь, когда у нас есть dishes, сопоставляем ID с полными объектами
    Object.keys(selected).forEach(cat => {
        if (selected[cat] && typeof selected[cat] === 'number') {
            const foundDish = dishes.find(d => d.id === selected[cat]);
            if (foundDish) selected[cat] = foundDish;
        }
    });
    
    renderDishes();
    setupFilters();
    updateStickyPanel();
    
  } catch (error) {
    console.error("❌ Ошибка загрузки меню:", error);
    document.querySelector('main').innerHTML = `<h2 style="text-align:center; color:red; margin-top: 50px;">Не удалось загрузить меню.<br>Проверьте консоль (F12).</h2>`;
  }
}

// Создание карточки
function createCard(dish) {
  const card = document.createElement('div');
  card.classList.add('dish');
  card.dataset.dish = dish.keyword;
  card.dataset.kind = dish.kind;
  
  // Если это блюдо уже выбрано, добавляем класс selected
  if (selected[dish.category] && selected[dish.category].id === dish.id) {
      card.classList.add('selected');
  }

  let imageSrc = dish.image;
  if (imageSrc.startsWith('images/')) {
    imageSrc = 'https://web-basics-api-gagashaggy.msk1.amvera.tech/' + imageSrc;
  }

  card.innerHTML = `
    <img src="${imageSrc}" alt="${dish.name}">
    <p class="price">${dish.price}₽</p>
    <p class="name">${dish.name}</p>
    <p class="weight">${dish.count}</p>
    <button>Добавить</button>
  `;

  card.addEventListener('click', () => {
    // Если кликаем по уже выбранному - ничего не делаем (или можно сделать сброс, но по заданию не требуется)
    selected[dish.category] = dish;
    saveSelectedToStorage();
    
    // Обновляем визуальное выделение карточек
    document.querySelectorAll('.dish').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.dish').forEach(c => {
        // Находим карточку, которая соответствует ID
        if (Object.values(selected).some(s => s && s.keyword === c.dataset.dish)) {
            c.classList.add('selected');
        }
    });

    updateStickyPanel();
  });

  return card;
}

// Вывод карточек на страницу
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

// Проверка, собрано ли валидное комбо
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

// Обновление прилипающей панели
function updateStickyPanel() {
    const panel = document.getElementById('stickyPanel');
    const totalLabel = document.getElementById('stickyTotal');
    const btn = document.getElementById('checkoutBtn');
    
    const chosen = Object.values(selected).filter(dish => dish !== null);
    
    if (chosen.length === 0) {
        panel.classList.remove('visible');
        return;
    }
    
    panel.classList.add('visible');
    
    const total = chosen.reduce((sum, dish) => sum + dish.price, 0);
    totalLabel.textContent = `Итого: ${total}₽`;
    
    if (isValidCombo()) {
        btn.classList.remove('disabled');
        btn.href = 'checkout.html';
    } else {
        btn.classList.add('disabled');
        btn.href = '#';
    }
}

// Настройка фильтров
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter');
  filterButtons.forEach(button => button.replaceWith(button.cloneNode(true)));
  
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

// Запуск
loadDishes();