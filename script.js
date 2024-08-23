// scripts.js
window.onload = function () {
    const savedPin = localStorage.getItem('pin');
    if (!savedPin) {
        showScreen('setup-screen');
    } else {
        showScreen('lock-screen');
        updateTime();
    }
};

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function savePin() {
    const pin = document.getElementById('pin').value;
    if (pin.length === 4) {
        localStorage.setItem('pin', pin);
        showScreen('lock-screen');
    } else {
        alert('PIN must be 4 digits');
    }
}

function unlock() {
    const enteredPin = document.getElementById('lock-pin').value;
    const savedPin = localStorage.getItem('pin');
    if (enteredPin === savedPin) {
        showScreen('home-screen');
        updateTime();
    } else {
        alert('Incorrect PIN');
    }
}

function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    timeDisplay.innerText = formattedTime;
    document.getElementById('time').innerText = formattedTime;
    setTimeout(updateTime, 1000);
}

function openApp(appName) {
    const appFrame = document.getElementById('app-frame');
    showScreen('app-viewer');
    switch (appName) {
        case 'browser':
            appFrame.src = 'https://www.google.com';
            break;
        case 'settings':
            appFrame.src = 'settings.html';
            break;
        // Add more cases for other apps
        default:
            appFrame.src = '';
            alert('App not found');
    }
}

function closeApp() {
    showScreen('home-screen');
    document.getElementById('app-frame').src = '';
}
