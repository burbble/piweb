document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    try {
        const formData = new FormData(this);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'interests') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(data.phone)) {
            throw new Error('Номер телефона должен быть в формате +7 (XXX) XXX-XX-XX');
        }

        const resultsWindow = window.open('', 'Results', 'width=600,height=400,resizable=yes');
        
        resultsWindow.document.write(`
            <html>
            <head>
                <title>Результаты</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        padding: 20px;
                        background: url('../resources/background.jpg') no-repeat center;
                        background-size: cover;
                    }
                    table { 
                        border-collapse: collapse; 
                        width: 100%; 
                        border: 2px solid #333;
                        margin: 20px 0;
                    }
                    th, td { 
                        border: 1px solid #333; 
                        padding: 8px; 
                        text-align: left;
                    }
                    th { background: #f4f4f4; }
                    button {
                        padding: 10px 20px;
                        margin: 5px;
                        background: #0066cc;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    button:hover { background: #0052a3; }
                </style>
            </head>
            <body>
                <h2>Результаты опроса</h2>
                <table>
                    <tr><th>Поле</th><th>Значение</th></tr>
                    <tr><td>Имя</td><td>${data.name}</td></tr>
                    <tr><td>Веб-сайт</td><td>${data.website}</td></tr>
                    <tr><td>Email</td><td>${data.email}</td></tr>
                    <tr><td>Телефон</td><td>${data.phone}</td></tr>
                    <tr><td>Дата рождения</td><td>${data.birthdate}</td></tr>
                    <tr><td>Пол</td><td>${data.gender}</td></tr>
                    <tr><td>Интересы</td><td>${data.interests ? data.interests.join(', ') : 'Не выбрано'}</td></tr>
                </table>
                <button onclick="window.close()">Закрыть</button>
                <button onclick="window.opener.focus();window.close()">Вернуться</button>
            </body>
            </html>
        `);

    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = '+7 ';
    if (value.length > 1) {
        formatted += '(' + value.slice(1, 4);
    }
    if (value.length >= 4) {
        formatted += ') ' + value.slice(4, 7);
    }
    if (value.length >= 7) {
        formatted += '-' + value.slice(7, 9);
    }
    if (value.length >= 9) {
        formatted += '-' + value.slice(9, 11);
    }
    
    e.target.value = formatted;
});
