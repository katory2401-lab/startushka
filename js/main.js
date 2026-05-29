function toggleVision() {
    document.body.classList.toggle('high-contrast');
    
    // Сохраняем выбор в памяти браузера
    if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('vision', 'high-contrast');
    } else {
        localStorage.removeItem('vision');
    }
}

// При загрузке страницы проверяем, был ли включён режим
window.onload = function() {
    if (localStorage.getItem('vision') === 'high-contrast') {
        document.body.classList.add('high-contrast');
    }
};
// Счётчик дней до конца учебного года
function updateCounter() {
    var endDate = new Date('2026-05-31');
    var today = new Date();
    var diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
    var counter = document.getElementById('days-counter');
    if (counter) {
        if (diff > 0) {
            counter.textContent = diff + ' дней';
        } else if (diff === 0) {
            counter.textContent = 'Сегодня последний день!';
        } else {
            counter.textContent = 'Учебный год завершён!';
        }
    }
}

updateCounter();
// Виджет погоды (бесплатный API)
fetch('https://api.open-meteo.com/v1/forecast?latitude=56.5&longitude=50.8&current_weather=true')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var weatherDiv = document.getElementById('weather');
        if (weatherDiv && data.current_weather) {
            var temp = data.current_weather.temperature;
            var wind = data.current_weather.windspeed;
            var code = data.current_weather.weathercode;
            
            var desc = 'Ясно';
            if (code >= 1 && code <= 3) desc = 'Переменная облачность';
            if (code >= 45 && code <= 48) desc = 'Туман';
            if (code >= 51 && code <= 55) desc = 'Морось';
            if (code >= 61 && code <= 65) desc = 'Дождь';
            if (code >= 71 && code <= 77) desc = 'Снег';
            if (code >= 80 && code <= 82) desc = 'Ливень';
            
            weatherDiv.innerHTML = 'Температура: <strong>' + temp + '°C</strong>, ' + desc + ', ветер: ' + wind + ' м/с';
        }
    })
    .catch(function() {
        var weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            weatherDiv.textContent = 'Не удалось загрузить погоду';
        }
    });