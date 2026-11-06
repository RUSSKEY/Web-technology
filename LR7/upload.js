// Сюда мы скопировали твои блюда и добавили каждому id
const myDishes = [
  { id: 1, keyword: 'borsch', name: 'Борщ со сметаной', price: 190, category: 'soup', count: '350 г', image: 'img/soup-1.jpg', kind: 'meat' },
  { id: 2, keyword: 'shi', name: 'Щи из свежей капусты', price: 188, category: 'soup', count: '330 г', image: 'img/soup-2.jpg', kind: 'veg' },
  { id: 3, keyword: 'chicken-soup', name: 'Куриный суп с лапшой', price: 270, category: 'soup', count: '330 г', image: 'img/soup-3.jpg', kind: 'meat' },
  { id: 4, keyword: 'ukha', name: 'Уха по-домашнему', price: 290, category: 'soup', count: '350 г', image: 'img/soup-4.jpg', kind: 'fish' },
  { id: 5, keyword: 'fish-soup', name: 'Рыбный суп с фрикадельками', price: 310, category: 'soup', count: '340 г', image: 'img/soup-5.jpg', kind: 'fish' },
  { id: 6, keyword: 'pea-soup', name: 'Гороховый суп', price: 210, category: 'soup', count: '330 г', image: 'img/soup-6.jpg', kind: 'veg' },
  { id: 7, keyword: 'draniki', name: 'Драники с грибным соусом', price: 150, category: 'main', count: '250 г', image: 'img/main-1.jpg', kind: 'veg' },
  { id: 8, keyword: 'pelmeni', name: 'Пельмени домашние', price: 385, category: 'main', count: '310 г', image: 'img/main-2.jpg', kind: 'meat' },
  { id: 9, keyword: 'kotlety', name: 'Котлеты из курицы с картофельным пюре', price: 225, category: 'main', count: '280 г', image: 'img/main-3.jpg', kind: 'meat' },
  { id: 10, keyword: 'baked-fish', name: 'Запечённая рыба с овощами', price: 340, category: 'main', count: '270 г', image: 'img/main-4.jpg', kind: 'fish' },
  { id: 11, keyword: 'fish-cotlet', name: 'Рыбные котлеты с рисом', price: 320, category: 'main', count: '280 г', image: 'img/main-5.jpg', kind: 'fish' },
  { id: 12, keyword: 'syrniki', name: 'Сырники со сгущёнкой', price: 220, category: 'main', count: '250 г', image: 'img/main-6.jpg', kind: 'veg' },
  { id: 13, keyword: 'olivier', name: 'Оливье с курицей', price: 320, category: 'salad', count: '230 г', image: 'img/salad-1.jpg', kind: 'meat' },
  { id: 14, keyword: 'vinaigrette', name: 'Винегрет', price: 210, category: 'salad', count: '220 г', image: 'img/salad-2.jpg', kind: 'veg' },
  { id: 15, keyword: 'greek-salad', name: 'Греческий салат', price: 350, category: 'salad', count: '240 г', image: 'img/salad-3.jpg', kind: 'veg' },
  { id: 16, keyword: 'fresh-salad', name: 'Салат из свежих овощей', price: 250, category: 'salad', count: '220 г', image: 'img/salad-4.jpg', kind: 'veg' },
  { id: 17, keyword: 'tuna-salad', name: 'Салат с тунцом', price: 480, category: 'salad', count: '250 г', image: 'img/salad-5.jpg', kind: 'fish' },
  { id: 18, keyword: 'cabbage-salad', name: 'Салат из капусты с огурцом', price: 190, category: 'salad', count: '210 г', image: 'img/salad-6.jpg', kind: 'veg' },
  { id: 19, keyword: 'kompot', name: 'Компот из ягод', price: 120, category: 'drink', count: '300 мл', image: 'img/drink-1.jpg', kind: 'cold' },
  { id: 20, keyword: 'mors', name: 'Морс клюквенный', price: 90, category: 'drink', count: '300 мл', image: 'img/drink-2.jpg', kind: 'cold' },
  { id: 21, keyword: 'carrot-juice', name: 'Морковный сок', price: 110, category: 'drink', count: '300 мл', image: 'img/drink-3.jpg', kind: 'cold' },
  { id: 22, keyword: 'black-tea', name: 'Чёрный чай', price: 90, category: 'drink', count: '300 мл', image: 'img/drink-4.jpg', kind: 'hot' },
  { id: 23, keyword: 'green-tea', name: 'Зелёный чай', price: 100, category: 'drink', count: '300 мл', image: 'img/drink-5.jpg', kind: 'hot' },
  { id: 24, keyword: 'cappuccino', name: 'Капучино', price: 180, category: 'drink', count: '300 мл', image: 'img/drink-6.jpg', kind: 'hot' },
  { id: 25, keyword: 'syrniki-dessert', name: 'Сырники с мёдом', price: 220, category: 'dessert', count: '180 г', image: 'img/dessert-1.jpg', kind: 'small' },
  { id: 26, keyword: 'bliny', name: 'Блины с творогом', price: 240, category: 'dessert', count: '200 г', image: 'img/dessert-2.jpg', kind: 'small' },
  { id: 27, keyword: 'vatrushka', name: 'Ватрушка с творогом', price: 160, category: 'dessert', count: '150 г', image: 'img/dessert-3.jpg', kind: 'small' },
  { id: 28, keyword: 'medovik', name: 'Медовик', price: 280, category: 'dessert', count: '200 г', image: 'img/dessert-4.jpg', kind: 'medium' },
  { id: 29, keyword: 'cheesecake', name: 'Чизкейк', price: 320, category: 'dessert', count: '180 г', image: 'img/dessert-5.jpg', kind: 'medium' },
  { id: 30, keyword: 'choco-cake', name: 'Шоколадный торт', price: 450, category: 'dessert', count: '300 г', image: 'img/dessert-6.jpg', kind: 'large' }
];

// ТВОЙ КЛЮЧ ДОСТУПА
const API_KEY = '25922801-6ce0-3cfe-8676-fd628bb949f3'; 

async function uploadMyDishes() {
  try {
    let url = 'https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my';
    url += `?api_key=${API_KEY}`;

    console.log("Отправляем твои блюда на сервер...");
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myDishes)
    });

    if (response.ok) {
      console.log("✅ Успех! Блюда загружены. Теперь обнови страницу сайта.");
    } else {
      console.error("❌ Ошибка загрузки:", response.status, await response.text());
    }
  } catch (error) {
    console.error("❌ Ошибка сети:", error);
  }
}

uploadMyDishes();