let books = [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Funkcja rejestracji
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('Nazwa użytkownika jest już zajęta.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Rejestracja zakończona pomyślnie.');
            showLogin();
        }
    } else {
        alert('Proszę wprowadzić nazwę użytkownika i hasło.');
    }
}

// Funkcja logowania
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        window.location.href = 'library.html';
    } else {
        alert('Niepoprawna nazwa użytkownika lub hasło.');
    }
}

// Pokaż formularz rejestracji
function showRegister() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
}

// Pokaż formularz logowania
function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
}

// Dodaj książkę
function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    if (bookTitle) {
@@ -14,6 +61,7 @@ function addBook() {
    }
}

// Zaktualizuj książkę
function updateBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    const author = document.getElementById('author').value;
@@ -42,13 +90,15 @@ function updateBook() {
    }
}

// Usuń książkę
function deleteBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    books = books.filter(b => b.title !== targetTitle);
    document.getElementById('targetTitle').value = '';
    updateTable();
}

// Zaktualizuj tabelę
function updateTable() {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = '';
@@ -67,17 +117,7 @@ function updateTable() {
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        window.location.href = 'library.html';
    } else {
        alert('Niepoprawna nazwa użytkownika lub hasło.');
    }
}

// Wyloguj się
function logout() {
    window.location.href = 'index.html';
}
