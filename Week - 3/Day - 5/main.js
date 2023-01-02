'use strict'

window.addEventListener('load', async () => {

    const db = await fetch('./attachments/db.json').then((res) => res.json());
    const countries = Object.keys(db);
    const menu = document.querySelector('#menu ul');
    const articleContainer = document.querySelector('#article-container');
    const topCities = getTopCities(db, countries, 12);
    //Load menu
    loadMenu(menu, countries, db, articleContainer, topCities);
    setTimeout(() => loadCities(articleContainer, topCities),500);
});

function loadMenu(menu, countries, db, articleContainer, topCities){
    //Top Countries
    const top = createMenuItem("Top", db, articleContainer, true);
    top.addEventListener('click', () => menuOnClick(top, articleContainer, menu, topCities) );
    menu.append(top);
    countries.forEach((country) => {
        const countryNode = createMenuItem(country, db, articleContainer);
        countryNode.addEventListener('click', () => menuOnClick(countryNode, articleContainer, menu, db[country]) );
        menu.append(countryNode);
    });
}

function loadCities(articleContainer, cities){
    articleContainer.innerHTML = '';
    cities.forEach((city, i) => {
        const cityNode = createCityArticle(city);
        setTimeout(()=> cityNode.style.display = `flex`, 150*i );
        articleContainer.append(cityNode);
    });
}

function getTopCities(db, countries, num){
    const allCities = countries.reduce((acc, current)=> [...acc, ...db[current]], []);
    const topCities = allCities.sort( (a, b) => (a.rate > b.rate) ? -1 : 1 ).slice(0,num);
    return topCities;
}

function createMenuItem(country, db, articleContainer, active = false){
    const li = document.createElement('li');  
    li.innerHTML = `
        ${country}
        <span class="icon-dot"></span>
    `;
    if(active) li.classList.add('active');
    return li;
}

function createCityArticle(city){
    const article = document.createElement('article');  
    article.style.background = `url('${city.image}')`;
    article.innerHTML = `
        <div class="city-data">
            <h3 class="name">
                ${city.name}
            </h3>
            <p class="info">
                <span class="icon-star"></span>
                ${city.rate}
            </p>
        </div>  
    `;
    return article;
}

function menuOnClick(countryNode, articleContainer, menu, cityList){
    //Remove current active country
    menu.querySelector('.active').classList.remove('active');
    //Set active country
    countryNode.classList.add('active');
    //Load cities
    loadCities(articleContainer, cityList);
}