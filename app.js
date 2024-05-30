let books = [];

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
        }
    }
}

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
    } else {
        alert('Ten tytuł nie znajduje się w tabeli.');
    }
}

function deleteBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    books = books.filter(b => b.title !== targetTitle);
    document.getElementById('targetTitle').value = '';
    updateTable();
}

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

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        window.location.href = 'library.html';
    } else {
        alert('Niepoprawna nazwa użytkownika lub hasło.');
    }
}
