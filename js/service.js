'use strict'

var gProjs = [{
    id: "minesweeper",
    name: "MineSweeper",
    title: "Best Game Ever!",
    desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now - with all the new features and help, with 3 different levels of diffuclties and set new records!! good LUCK!",
    url: "https://tommyirmia.github.io/mineSweeper2.0/",
    publishedAt: "July 2021",
    labels: ["Sprint 1", "Games"],
}, {
    id: "bookshop",
    name: "Tale Time - Book Shop",
    title: "The book shop with all the tales you can possibly think of!",
    desc: "In this book shop you will find all of the tales you can think of, and the ones you couldn't! you can update the prices, add new books and delete the ones that are out of stock! Tale Time for your service at any time!",
    url: "https://tommyirmia.github.io/BookShop-TaleTime/",
    publishedAt: "July 2021",
    labels: ["Week 4", "WebStore"],
}, {
    id: "minesweeper",
    name: "MineSweeper",
    title: "Best Game Ever!",
    desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now - with all the new features and help, with 3 different levels of diffuclties and set new records!! good LUCK!",
    url: "https://tommyirmia.github.io/mineSweeper2.0/",
    publishedAt: "July 2021",
    labels: ["Sprint 1", "Games"],
}, {
    id: "minesweeper",
    name: "MineSweeper",
    title: "Best Game Ever!",
    desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now - with all the new features and help, with 3 different levels of diffuclties and set new records!! good LUCK!",
    url: "https://tommyirmia.github.io/mineSweeper2.0/",
    publishedAt: "July 2021",
    labels: ["Sprint 1", "Games"],
}, {
    id: "minesweeper",
    name: "MineSweeper",
    title: "Best Game Ever!",
    desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now - with all the new features and help, with 3 different levels of diffuclties and set new records!! good LUCK!",
    url: "https://tommyirmia.github.io/mineSweeper2.0/",
    publishedAt: "July 2021",
    labels: ["Sprint 1", "Games"],
}, {
    id: "minesweeper",
    name: "MineSweeper",
    title: "Best Game Ever!",
    desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now - with all the new features and help, with 3 different levels of diffuclties and set new records!! good LUCK!",
    url: "https://tommyirmia.github.io/mineSweeper2.0/",
    publishedAt: "July 2021",
    labels: ["Sprint 1", "Games"],
}, ]

function getProjs() {
    return gProjs
}

function getProjById(id) {
    return gProjs.find(function(proj) {
        return proj.id === id;
    })
}