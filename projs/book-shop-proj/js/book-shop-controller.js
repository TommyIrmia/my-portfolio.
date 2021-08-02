'use strict'



function onInit() {
    console.log('hi');
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHeadHTML = `<table><tr><th onclick="setSortBy('id', this)">Id <span>▼</span></th>
    <th onclick="setSortBy('title', this)">Title <span>▽</span></th>
    <th onclick="setSortBy('price', this)">Price <span>▽</span></th>
    <th>Actions</th></tr>`;
    var strBodyHTMLs = books.map(function(book) {
        return `<tr><td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}$</td>
        <td><button class="action read-btn" onclick="onReadBook(${book.id})">Read</button>
        <button class="action update-btn" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="action delete-btn" onclick="onDeleteBook(${book.id})">Delete</button></td></tr>`
    })

    var elContainer = document.querySelector('.books-container');
    elContainer.innerHTML = strHeadHTML + strBodyHTMLs.join('') + '</table>';
}

function renderPages() {
    var num = getNumPages();
}

function setSortBy(val, elTh) {
    sortBy(val);
    renderBooks();
}

function onDeleteBook(id) {
    deleteBook(id);
    renderBooks();
}

function onReadBook(id) {
    var book = getBookById(id);
    var elModal = document.querySelector('.modal');

    elModal.querySelector('h5').innerText = `Book Name: ${book.title}`;
    elModal.querySelector('.price').innerText = `Book Price: ${book.price}`;
    elModal.querySelector('p').innerHTML = `<b>Book description</b>: ${book.description}`;
    elModal.querySelector('.pic').innerHTML = book.img;
    elModal.querySelector('.rate-container').innerHTML = `Rating: 
    <button class="red" value="-" onclick="onRateBook(this.value,${id})">-</button>
    <div class="rating">${book.rating}</div>
    <button class="green" value="+" onclick="onRateBook(this.value, ${id})">+</button>`;


    elModal.hidden = false;
    setRatingColor(book.rating)
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.animation = 'scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    setTimeout(function() {
        elModal.style.animation = '';
        elModal.hidden = true
    }, 500);

}

function onCloseAdd() {
    var elModal = document.querySelector('.inputs-container');
    elModal.hidden = true;

}

function onUpdateBook(id) {
    updateBook(id);
    renderBooks();
}

function onCreateBook() {
    var elAddBook = document.querySelector('.inputs-container');
    elAddBook.hidden = false;
}

function onAddBook() {
    var elBookName = document.querySelector('[name="book-name"]');
    var elBookPrice = document.querySelector('[name="book-price"]');
    var elBookImg = document.querySelector('[name="book-img"]');

    var bookName = elBookName.value;
    var bookPrice = elBookPrice.value;
    var bookImg = elBookImg.value;

    addBook(bookName, bookPrice, bookImg);
    renderBooks();

    var elAddBook = document.querySelector('.inputs-container');
    elAddBook.hidden = true;
}

function onRateBook(val, id) {
    rateBook(val, id);
    onReadBook(id);
}

function onNextPage() {
    nextPage();
    renderBooks();
}