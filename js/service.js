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
        id: "pacman",
        name: "PacMan",
        title: "The Nostalgic Game!",
        desc: "The old nostalgic game with a futuristic twist! CANT HELP BUT GET ADDICTED!! play it now! eat all the food on the screen, super FOOD allows you to kill the ghosts - and CHERRIES gives toy extra points!! good LUCK!",
        url: "https://tommyirmia.github.io/pacman/",
        publishedAt: "July 2021",
        labels: ["Week 3", "Games"],
    }, {
        id: "ballboard",
        name: "BallBoard",
        title: "Get Them Balls!",
        desc: "In this game you will have to collect all of the balls appearing on the screen, in order to win - you must get them all! BUT beware of the gum - you might get stuck! there are also passages for quicker traveling ;) good LUCK!",
        url: "https://tommyirmia.github.io/ball-board/",
        publishedAt: "July 2021",
        labels: ["Week 2", "Games"],
    }, {
        id: "touchnums",
        name: "TouchNums",
        title: "Test Your Quickness!",
        desc: "This game will test your finger quickness! in an all new featured game - with 4 different difficulty levels, and a time to check who's the best! You are going to enjoy playing this with friends or family - and let me know who did best!! good LUCK!",
        url: "https://tommyirmia.github.io/touch-nums/",
        publishedAt: "July 2021",
        labels: ["Week 3", "Games"],
    }, {
        id: "safecontent",
        name: "Safe Content",
        title: "A cool login page!",
        desc: "My take on a cool login page, only the correct username and password will alow you to advance to a secret data!",
        url: "https://tommyirmia.github.io/safe-content/",
        publishedAt: "July 2021",
        labels: ["Week 4", "Login Screen"],
    }, {
        id: "inpicture",
        name: "What's in the picture?",
        title: "You guess it!",
        desc: "What's in the picture game, you all know it - but you've never played a one with crazy animal pictures like this one! HOPE YOU HAVE FUN!!",
        url: "https://tommyirmia.github.io/in-picture/",
        publishedAt: "July 2021",
        labels: ["Week 2", "Games"],
    },
    {
        id: "guessme",
        name: "Guess Me?",
        title: "Think of a Celeb - and I'll figure it out!",
        desc: "Guess Me is a self learning game, first it will try to guess the celeb you're thinking about, IF it fails - you will be required to enter a celeb, and a question - and the next time it will know! HOPE YOU HAVE FUN!!",
        url: "https://tommyirmia.github.io/guess-me/",
        publishedAt: "August 2021",
        labels: ["Week 5", "Games"],
    },
]

function getProjs() {
    return gProjs
}

function getProjById(id) {
    return gProjs.find(function(proj) {
        return proj.id === id;
    })
}