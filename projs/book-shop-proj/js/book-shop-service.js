'use strict'
const KEY = 'bookDB';
const PAGE_SIZE = 5;

var gBooks;
var gBookId = 1;
var gSortBy = 'id';
var gPageIdx = 0;

_createBooks();


function getNumOfPages() {
    return Math.ceil(gBooks.length / PAGE_SIZE);
}


function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function sortBy(val) {
    gSortBy = val;
    if (gSortBy === 'id') {
        return function(a, b) {
            return a.id - b.id;
        }
    }
    if (gSortBy === 'title') {
        return function(a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        }
    }
    if (gSortBy === 'price') {
        return function(a, b) {
            return (a.price < b.price) ? -1 : 1;
        }
    }
}

function deleteBook(id) {
    var bookIdx = gBooks.findIndex(function(book) {
        return id === book.id
    })
    gBooks.splice(bookIdx, 1);
    _updateBooksId()
    _saveBooksToStorage();
}

function updateBook(id) {
    var book = getBookById(id);
    var newPrice = prompt('Enter new price please?');
    book.price = newPrice;
    _saveBooksToStorage();
}

function addBook(title, price, img) {
    img = `<img src="${img}" >`
    var book = _createBook(title, price, img);
    gBooks.unshift(book);
    _updateBooksId()
    _saveBooksToStorage();

    clearInputs();
}

function clearInputs() {
    var elInputs = document.querySelectorAll('input');
    elInputs.forEach(function(input) {
        input.value = '';
    })
}

function getBooks() {
    getNumOfPages()
    gBooks.sort(sortBy(gSortBy));
    var startIdx = gPageIdx * PAGE_SIZE;

    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getBookById(id) {
    return gBooks.find(function(book) {
        return id === book.id;
    })
}

function rateBook(val, id) {
    var book = getBookById(id);
    if (book.rating < 10) {
        if (val === '+') book.rating++;
    }
    if (book.rating > 0) {
        if (val === '-') book.rating--;
    }
    _saveBooksToStorage();
}

function setRatingColor(rating) {
    var elRating = document.querySelector('.rating');
    if (rating < 3) {
        elRating.style.backgroundColor = 'red';
        return;
    } else if (rating < 6) {
        elRating.style.backgroundColor = 'orange';
        return;
    } else if (rating < 9) {
        elRating.style.backgroundColor = 'lightgreen';
        return;
    } else {
        elRating.style.backgroundColor = 'green';
        elRating.style.color = 'white';
    }
}

function _updateBooksId() {
    gBookId = 1;
    gBooks.forEach(function(book) {
        book.id = gBookId++;
    })
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [_createBook('Cinderlla', '15', '<img src="img/cinderella.jpg">'),
            _createBook('Henzel$Gretel', '10', '<img src="img/henzel&gretel.jpg">'),
            _createBook('Robbin Hood', '12', '<img src="img/robbinhood.jpg">'),
            _createBook('The Jackal and the Spring', '15', '<img src="img/thejackal.jpg">'),
            _createBook('The Beauty and The Best', '20', '<img src="img/beautyandbeast.jpg">'),
            _createBook('SnowWhite-the REAL story', '17', '<img src="img/snowwhite.jpg">')
        ]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(title, price, img) {
    return {
        id: gBookId++,
        title,
        price,
        description: makeLorem(),
        img,
        rating: 0
    }
}