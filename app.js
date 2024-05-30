let books = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Przykładowa logika logowania
    if (username === 'admin' && password === 'admin123') {
        // Zapisanie informacji o zalogowaniu w pamięci przeglądarki
        localStorage.setItem('loggedIn', true);

        // Przekierowanie do widoku biblioteki
        window.location.href = 'library.html';
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
}

// Sprawdzenie stanu logowania przy ładowaniu strony
window.onload = function() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        // Przekierowanie do widoku biblioteki, jeśli użytkownik jest zalogowany
        window.location.href = 'library.html';
    }
};
