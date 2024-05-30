let books = [];

function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    if (bookTitle) {
        books.push({ title: bookTitle, author: '', genre: '', totalPages: 0, pagesRead: 0 });
        document.getElementById('bookTitle').value = '';
        updateTable();
    }
}

function updateBook() {
    const targetTitle = document.getElementById('targetTitle').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const totalPages = document.getElementById('totalPages').value;
    const pagesRead = document.getElementById('pagesRead').value;

    const book = books.find(b => b.title === targetTitle);
    if (book) {
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (totalPages) book.totalPages = parseInt(totalPages);
        if (pagesRead) book.pagesRead = parseInt(pagesRead);
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
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.totalPages}</td>
            <td>${book.pagesRead}</td>
        `;
        tbody.appendChild(row);
    });
}