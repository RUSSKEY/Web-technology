const API_KEY = '25922801-6ce0-3cfe-8676-fd628bb949f3';
const BASE_URL = 'https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api';

let allOrders = [];
let allDishes = [];
let currentOrderId = null;

// ===== 1. ЗАГРУЗКА ДАННЫХ =====
async function loadData() {
    try {
        // Загружаем блюда
        const dishesRes = await fetch(`${BASE_URL}/dishes/my?api_key=${API_KEY}`);
        if (dishesRes.ok) {
            allDishes = await dishesRes.json();
        } else {
            const defRes = await fetch(`${BASE_URL}/dishes/default?api_key=${API_KEY}`);
            if (defRes.ok) allDishes = await defRes.json();
        }

        // Загружаем заказы
        const ordersRes = await fetch(`${BASE_URL}/orders?api_key=${API_KEY}`);
        if (!ordersRes.ok) throw new Error('Ошибка загрузки заказов');
        
        allOrders = await ordersRes.json();
        
        // Сортируем по дате (сначала новые)
        allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        renderTable();
    } catch (error) {
        console.error(error);
        document.getElementById('orders-list').innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Ошибка загрузки данных</td></tr>`;
    }
}

// ===== 2. ФУНКЦИЯ РАСЧЕТА СТОИМОСТИ =====
function calculateOrderTotal(order) {
    let total = 0;
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    
    ids.forEach(id => {
        if (id) {
            const dish = allDishes.find(d => d.id === id);
            if (dish) {
                total += dish.price;
            }
        }
    });
    return total;
}

// Функция получения названий блюд по их ID
function getDishNames(order) {
    const names = [];
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    
    ids.forEach(id => {
        if (id) {
            const dish = allDishes.find(d => d.id === id);
            if (dish) names.push(dish.name);
        }
    });
    return names;
}

// ===== 3. ОТРИСОВКА ТАБЛИЦЫ =====
function renderTable() {
    const tbody = document.getElementById('orders-list');
    tbody.innerHTML = '';

    if (allOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px;">У вас пока нет заказов.</td></tr>`;
        return;
    }

    const iconEye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconEdit = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
    const iconTrash = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

    allOrders.forEach((order, index) => {
        const tr = document.createElement('tr');
        
        const dateObj = new Date(order.created_at);
        const dateStr = dateObj.toLocaleString('ru-RU', { 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour: '2-digit', minute: '2-digit' 
        });

        const dishNames = getDishNames(order);
        const totalPrice = calculateOrderTotal(order);
        
        let deliveryTimeStr = "";
        if (order.delivery_type === 'now') {
            deliveryTimeStr = "В течение дня<br><small>(с 07:00 до 23:00)</small>";
        } else {
            deliveryTimeStr = order.delivery_time || "—";
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${dateStr}</td>
            <td>${dishNames.join(', ')}</td>
            <td>${totalPrice}₽</td>
            <td>${deliveryTimeStr}</td>
            <td>
                <button class="action-btn" onclick="openViewModal(${order.id})" title="Подробнее">${iconEye}</button>
                <button class="action-btn" onclick="openEditModal(${order.id})" title="Редактирование">${iconEdit}</button>
                <button class="action-btn" onclick="openDeleteModal(${order.id})" title="Удаление">${iconTrash}</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===== 4. МОДАЛКА "ПРОСМОТР" =====
function openViewModal(id) {
    const order = allOrders.find(o => o.id === id);
    if (!order) return;

    const dateObj = new Date(order.created_at);
    const dateStr = dateObj.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const dishNames = getDishNames(order);
    const totalPrice = calculateOrderTotal(order);
    let deliveryTimeStr = order.delivery_type === 'now' ? "Как можно скорее (с 07:00 до 23:00)" : order.delivery_time;

    document.getElementById('view-body').innerHTML = `
        <div class="view-info-row"><strong>Дата оформления:</strong> <span>${dateStr}</span></div>
        <div class="view-info-row"><strong>Имя получателя:</strong> <span>${order.full_name}</span></div>
        <div class="view-info-row"><strong>Адрес доставки:</strong> <span>${order.delivery_address}</span></div>
        <div class="view-info-row"><strong>Время доставки:</strong> <span>${deliveryTimeStr}</span></div>
        <div class="view-info-row"><strong>Телефон:</strong> <span>${order.phone}</span></div>
        <div class="view-info-row"><strong>Email:</strong> <span>${order.email}</span></div>
        <div class="view-info-row"><strong>Комментарий:</strong> <span>${order.comment || '—'}</span></div>
        <div class="view-info-row" style="margin-top:20px;"><strong>Состав заказа:</strong></div>
        <ul style="margin-left: 20px; margin-bottom: 15px;">
            ${dishNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
        <div class="view-info-row"><strong>Стоимость:</strong> <span>${totalPrice}₽</span></div>
    `;

    document.getElementById('view-modal').classList.add('active');
}

// ===== 5. МОДАЛКА "РЕДАКТИРОВАНИЕ" =====
function openEditModal(id) {
    const order = allOrders.find(o => o.id === id);
    if (!order) return;
    currentOrderId = id;

    const dateObj = new Date(order.created_at);
    const dateStr = dateObj.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const totalPrice = calculateOrderTotal(order);
    
    document.getElementById('edit-date').textContent = dateStr;
    document.getElementById('edit-name').value = order.full_name;
    document.getElementById('edit-address').value = order.delivery_address;
    document.getElementById('edit-type').value = order.delivery_type;
    document.getElementById('edit-time').value = order.delivery_time || '';
    document.getElementById('edit-phone').value = order.phone;
    document.getElementById('edit-email').value = order.email;
    document.getElementById('edit-comment').value = order.comment || '';

    const timeInput = document.getElementById('edit-time');
    timeInput.disabled = (order.delivery_type === 'now');

    const dishNames = getDishNames(order);
    document.getElementById('edit-composition').innerHTML = `
        <h4>Состав заказа</h4>
        <ul style="margin-left: 20px;">
            ${dishNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
        <p><strong>Стоимость:</strong> ${totalPrice}₽</p>
    `;

    document.getElementById('edit-modal').classList.add('active');
}

document.getElementById('edit-type').addEventListener('change', (e) => {
    const timeInput = document.getElementById('edit-time');
    if (e.target.value === 'by_time') {
        timeInput.disabled = false;
        timeInput.required = true;
    } else {
        timeInput.disabled = true;
        timeInput.required = false;
        timeInput.value = '';
    }
});

// Обработка сохранения (PUT)
document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Находим текущий заказ, чтобы взять его ID блюд и статус подписки
    const currentOrder = allOrders.find(o => o.id === currentOrderId);
    
    const deliveryType = document.getElementById('edit-type').value;
    
    // Собираем все поля, включая ID блюд (серверу спокойнее, когда приходит полный объект)
    const payload = {
        full_name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        phone: document.getElementById('edit-phone').value,
        delivery_address: document.getElementById('edit-address').value,
        delivery_type: deliveryType,
        comment: document.getElementById('edit-comment').value,
        subscribe: currentOrder.subscribe ? 1 : 0,
        soup_id: currentOrder.soup_id,
        main_course_id: currentOrder.main_course_id,
        salad_id: currentOrder.salad_id,
        drink_id: currentOrder.drink_id,
        dessert_id: currentOrder.dessert_id
    };

    // Если доставка по времени, добавляем время. Если "сейчас", то вообще не добавляем это поле.
    if (deliveryType === 'by_time') {
        const timeVal = document.getElementById('edit-time').value;
        if (!timeVal) {
            alert("Пожалуйста, укажите время доставки.");
            return;
        }
        payload.delivery_time = timeVal;
    }

    try {
        const res = await fetch(`${BASE_URL}/orders/${currentOrderId}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            // Если сервер вернул ошибку, считываем её текст для отладки
            const errorText = await res.text();
            console.error("Ответ сервера с ошибкой:", errorText);
            throw new Error(`Код ${res.status}: ${errorText}`);
        }

        alert("Заказ успешно изменён!");
        document.getElementById('edit-modal').classList.remove('active');
        loadData(); 
    } catch (error) {
        console.error(error);
        alert("Не удалось обновить заказ:\n" + error.message);
    }
});

// ===== 6. МОДАЛКА "УДАЛЕНИЕ" =====
function openDeleteModal(id) {
    currentOrderId = id;
    document.getElementById('delete-modal').classList.add('active');
}

document.getElementById('confirm-delete').addEventListener('click', async () => {
    try {
        const res = await fetch(`${BASE_URL}/orders/${currentOrderId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Код ${res.status}: ${errorText}`);
        }
        
        alert("Заказ успешно удалён!");
        document.getElementById('delete-modal').classList.remove('active');
        loadData();
    } catch (error) {
        console.error(error);
        alert("Не удалось удалить заказ:\n" + error.message);
    }
});

// ===== 7. ЗАКРЫТИЕ МОДАЛОК =====
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-close');
        document.getElementById(modalId).classList.remove('active');
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

// Запуск
loadData();