const dishes = [
  // Супы
  {
    keyword: 'borsch',
    name: 'Борщ со сметаной',
    price: 190,
    category: 'soup',
    count: '350 г',
    image: 'img/soup-1.jpg',
    kind: 'meat'
  },
  {
    keyword: 'shi',
    name: 'Щи из свежей капусты',
    price: 188,
    category: 'soup',
    count: '330 г',
    image: 'img/soup-2.jpg',
    kind: 'veg'
  },
  {
    keyword: 'chicken-soup',
    name: 'Куриный суп с лапшой',
    price: 270,
    category: 'soup',
    count: '330 г',
    image: 'img/soup-3.jpg',
    kind: 'meat'
  },
  {
    keyword: 'ukha',
    name: 'Уха по-домашнему',
    price: 290,
    category: 'soup',
    count: '350 г',
    image: 'img/soup-4.jpg',
    kind: 'fish'
  },
  {
    keyword: 'fish-soup',
    name: 'Рыбный суп с фрикадельками',
    price: 310,
    category: 'soup',
    count: '340 г',
    image: 'img/soup-5.jpg',
    kind: 'fish'
  },
  {
    keyword: 'pea-soup',
    name: 'Гороховый суп',
    price: 210,
    category: 'soup',
    count: '330 г',
    image: 'img/soup-6.jpg',
    kind: 'veg'
  },

  // Главные блюда
  {
    keyword: 'draniki',
    name: 'Драники с грибным соусом',
    price: 150,
    category: 'main',
    count: '250 г',
    image: 'img/main-1.jpg',
    kind: 'veg'
  },
  {
    keyword: 'pelmeni',
    name: 'Пельмени домашние',
    price: 385,
    category: 'main',
    count: '310 г',
    image: 'img/main-2.jpg',
    kind: 'meat'
  },
  {
    keyword: 'kotlety',
    name: 'Котлеты из курицы с картофельным пюре',
    price: 225,
    category: 'main',
    count: '280 г',
    image: 'img/main-3.jpg',
    kind: 'meat'
  },
  {
    keyword: 'baked-fish',
    name: 'Запечённая рыба с овощами',
    price: 340,
    category: 'main',
    count: '270 г',
    image: 'img/main-4.jpg',
    kind: 'fish'
  },
  {
    keyword: 'fish-cotlet',
    name: 'Рыбные котлеты с рисом',
    price: 320,
    category: 'main',
    count: '280 г',
    image: 'img/main-5.jpg',
    kind: 'fish'
  },
  {
    keyword: 'syrniki',
    name: 'Сырники со сгущёнкой',
    price: 220,
    category: 'main',
    count: '250 г',
    image: 'img/main-6.jpg',
    kind: 'veg'
  },

  // Салаты и стартеры
  {
    keyword: 'olivier',
    name: 'Оливье с курицей',
    price: 320,
    category: 'salad',
    count: '230 г',
    image: 'img/salad-1.jpg',
    kind: 'meat'
  },
  {
    keyword: 'vinaigrette',
    name: 'Винегрет',
    price: 210,
    category: 'salad',
    count: '220 г',
    image: 'img/salad-2.jpg',
    kind: 'veg'
  },
  {
    keyword: 'greek-salad',
    name: 'Греческий салат',
    price: 350,
    category: 'salad',
    count: '240 г',
    image: 'img/salad-3.jpg',
    kind: 'veg'
  },
  {
    keyword: 'fresh-salad',
    name: 'Салат из свежих овощей',
    price: 250,
    category: 'salad',
    count: '220 г',
    image: 'img/salad-4.jpg',
    kind: 'veg'
  },
  {
    keyword: 'tuna-salad',
    name: 'Салат с тунцом',
    price: 480,
    category: 'salad',
    count: '250 г',
    image: 'img/salad-5.jpg',
    kind: 'fish'
  },
  {
    keyword: 'cabbage-salad',
    name: 'Салат из капусты с огурцом',
    price: 190,
    category: 'salad',
    count: '210 г',
    image: 'img/salad-6.jpg',
    kind: 'veg'
  },

  // Напитки
  {
    keyword: 'kompot',
    name: 'Компот из ягод',
    price: 120,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-1.jpg',
    kind: 'cold'
  },
  {
    keyword: 'mors',
    name: 'Морс клюквенный',
    price: 90,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-2.jpg',
    kind: 'cold'
  },
  {
    keyword: 'carrot-juice',
    name: 'Морковный сок',
    price: 110,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-3.jpg',
    kind: 'cold'
  },
  {
    keyword: 'black-tea',
    name: 'Чёрный чай',
    price: 90,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-4.jpg',
    kind: 'hot'
  },
  {
    keyword: 'green-tea',
    name: 'Зелёный чай',
    price: 100,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-5.jpg',
    kind: 'hot'
  },
  {
    keyword: 'cappuccino',
    name: 'Капучино',
    price: 180,
    category: 'drink',
    count: '300 мл',
    image: 'img/drink-6.jpg',
    kind: 'hot'
  },

  // Десерты
  {
    keyword: 'syrniki-dessert',
    name: 'Сырники с мёдом',
    price: 220,
    category: 'dessert',
    count: '180 г',
    image: 'img/dessert-1.jpg',
    kind: 'small'
  },
  {
    keyword: 'bliny',
    name: 'Блины с творогом',
    price: 240,
    category: 'dessert',
    count: '200 г',
    image: 'img/dessert-2.jpg',
    kind: 'small'
  },
  {
    keyword: 'vatrushka',
    name: 'Ватрушка с творогом',
    price: 160,
    category: 'dessert',
    count: '150 г',
    image: 'img/dessert-3.jpg',
    kind: 'small'
  },
  {
    keyword: 'medovik',
    name: 'Медовик',
    price: 280,
    category: 'dessert',
    count: '200 г',
    image: 'img/dessert-4.jpg',
    kind: 'medium'
  },
  {
    keyword: 'cheesecake',
    name: 'Чизкейк',
    price: 320,
    category: 'dessert',
    count: '180 г',
    image: 'img/dessert-5.jpg',
    kind: 'medium'
  },
  {
    keyword: 'choco-cake',
    name: 'Шоколадный торт',
    price: 450,
    category: 'dessert',
    count: '300 г',
    image: 'img/dessert-6.jpg',
    kind: 'large'
  }
];