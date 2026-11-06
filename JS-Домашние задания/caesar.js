// Функция шифрует и дешифрует строку шифром Цезаря.
// Используем русский алфавит из 33 букв (с "ё").
// Если действие 'decode', сдвиг меняется на отрицательный.
// Формула (idx + shift + 33) % 33 зацикливает алфавит и защищает от отрицательных индексов.

function cesar(str, shift, action) {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  let result = [];

  if (action === 'decode') {
    shift = -shift;
  }

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (alphabet.includes(char)) {
      let idx = alphabet.indexOf(char);
      let new_idx = (idx + shift + 33) % 33;
      result.push(alphabet[new_idx]);
    } else if (alphabet.includes(char.toLowerCase())) {
      let idx = alphabet.indexOf(char.toLowerCase());
      let new_idx = (idx + shift + 33) % 33;
      result.push(alphabet[new_idx].toUpperCase());
    } else {
      result.push(char);
    }
  }

  return result.join('');
}

// Ответ: хакуна матата