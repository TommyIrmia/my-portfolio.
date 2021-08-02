'use strict'

$(document).ready(onInit);

function onInit() {
    renderGrid();
}

function renderGrid() {
    var projs = getProjs();
    console.log(projs);
    var strHTMLs;
    strHTMLs = projs.map(function(proj) {
        var label1 = proj.labels[0]
        var label2 = proj.labels[1]
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${proj.id}')">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${label1}</h4>
        <p class="text-muted">${label2}</p>
        </div>`
    })
    $('.grid-container').html(strHTMLs)
}

function renderModal(id) {
    var proj = getProjById(id)
    var projImg = `img/portfolio/${proj.id}.png`

    $('.proj-name').text(proj.name);
    $('.proj-title').text(proj.title);
    $('.proj-url').attr("href", proj.url);
    $('.proj-img').attr("src", projImg);
    $('.proj-desc').text(proj.desc);
    $('.proj-date span').text(proj.publishedAt);
    $('.proj-client span').text(proj.labels[0]);
    $('.proj-category span').text(proj.labels[1]);

}