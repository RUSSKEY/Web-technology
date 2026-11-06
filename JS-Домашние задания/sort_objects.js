// Задание 6. Сортировка объектов.
// Функция принимает массив объектов (array) и ключ (key) для сортировки.
// Так как встроенный метод sort() использовать нельзя, я написал алгоритм "пузырьковой сортировки".
// Суть: мы проходим по массиву и сравниваем соседние элементы. 
// Если текущий элемент больше следующего (по значению ключа), мы меняем их местами.

function getSortedArray(array, key) {
  // Создаем копию массива, чтобы не изменять исходный массив он нам нужен для вывода)
  let sorted = [];
  for (let i = 0; i < array.length; i++) {
    sorted.push(array[i]);
  }

  // Алгоритм пузырьковой сортировки
  for (let i = 0; i < sorted.length - 1; i++) {
    for (let j = 0; j < sorted.length - 1 - i; j++) {
      // Обращаемся к свойству объекта по ключу через квадратные скобки: sorted[j][key]
      if (sorted[j][key] > sorted[j + 1][key]) {
        // Если элемент больше следующего, меняем их местами через временную переменную
        let temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }

  return sorted;
}

// ===== ПРИМЕР РАБОТЫ (как требует задание) =====

const students = [
  { name: 'Иван', age: 25 },
  { name: 'Анна', age: 20 },
  { name: 'Петр', age: 30 }
];

console.log('--- Исходный массив ---');
console.log(students);

// Сортируем по ключу 'age' (число)
const sortedByAge = getSortedArray(students, 'age');
console.log('--- Отсортированный по age (по возрастанию) ---');
console.log(sortedByAge);

// Сортируем по ключу 'name' (строка)
const sortedByName = getSortedArray(students, 'name');
console.log('--- Отсортированный по name (по алфавиту) ---');
console.log(sortedByName);