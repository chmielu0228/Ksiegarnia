let books = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

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
        currentUser = user.username;
        localStorage.setItem('currentUser', currentUser);
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
        const existingBook = books.find(book => book.title === bookTitle);
        if (existingBook) {
            alert('Ta książka jest już w tabeli.');
        } else {
            books.push({ title: bookTitle, author: '', genre: '', totalPages: 0, pagesRead: 0 });
            document.getElementById('bookTitle').value = '';
            updateTable();
            saveBooks();
        }
    }
}

// Zaktualizuj książkę
function updateBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const totalPages = parseInt(document.getElementById('totalPages').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);

    const book = books.find(b => b.title === targetTitle);
    if (book) {
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (totalPages) book.totalPages = totalPages;
        if (pagesRead >= 0 && pagesRead <= totalPages) {
            book.pagesRead = pagesRead;
        } else {
            alert('Ilość przeczytanych stron nie może być większa niż ilość stron książki.');
        }
        document.getElementById('targetTitle').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('totalPages').value = '';
        document.getElementById('pagesRead').value = '';
        updateTable();
        saveBooks();
    } else {
        alert('Ten tytuł nie znajduje się w tabeli.');
    }
}

// Usuń książkę
function deleteBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    books = books.filter(b => b.title !== targetTitle);
    document.getElementById('targetTitle').value = '';
    updateTable();
    saveBooks();
}

// Zaktualizuj tabelę
function updateTable() {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = '';
    books.forEach(book => {
        const percentRead = book.totalPages ? ((book.pagesRead / book.totalPages) * 100).toFixed(2) + '%' : '0%';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.totalPages}</td>
            <td>${book.pagesRead}</td>
            <td>${percentRead}</td>
        `;
        tbody.appendChild(row);
    });
}

// Zapisz książki do Local Storage
function saveBooks() {
    if (currentUser) {
        localStorage.setItem(currentUser + '_books', JSON.stringify(books));
    }
}

// Wczytaj książki z Local Storage
function loadBooks() {
    if (currentUser) {
        books = JSON.parse(localStorage.getItem(currentUser + '_books')) || [];
        updateTable();
    }
}

// Funkcja wylogowania
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Wyloguj się
function logout() {
    window.location.href = 'index.html';
}
