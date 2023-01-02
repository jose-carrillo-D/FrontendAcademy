/**star classes */
const ACTIVE = 'icon-star-full';
const INACTIVE = 'icon-star-empty';
/**Payload needed to get the JSON response we want */
const payload = {
    token: 'bnTf2uZ2fTRl2xk02KCSMQ',
    data: {
        nameFirst: "nameFirst",
        nameLast: "nameLast",
        personTitle: "personTitle",
        avatar: "personAvatar",
        date: "date",
        reviewTitle: "stringShort",
        reviewContent: "stringLong",
        score: "numberInt|0,5",
        _repeat: 5
    }
}

/**mock response to not use the available calls per day */
const mockResponse = [
    {
        "avatar": "https://robohash.org/evening.png?size=300x300",
        "date": "2070-02-11",
        "nameFirst": "Charity",
        "nameLast": "D'Amore",
        "personTitle": "National Directives Associate",
        "reviewContent": "Again, I always go to sea as a sailor, because they make a point of paying me for my trouble, whereas they never pay passengers a single penny that I ever heard of. On the contrary, passengers themselves must pay. And there is all the difference in the world between paying and being paid. The act of paying is perhaps the most uncomfortable infliction that the two orchard thieves entailed upon us. But _being paid_,—what will compare with it? The urbane activity with which a man receives money is really marvellous, considering that we so earnestly believe money to be the root of all earthly ills, and that on no account can a monied man enter heaven. Ah! how cheerfully we consign ourselves to perdition!",
        "reviewTitle": "True, they rather order me about some, and make me jump from spar tospar, like a grasshopper in a May meadow.",
        "score": 5
    },
    {
        "avatar": "https://robohash.org/ring.png?size=300x300",
        "date": "2005-01-03",
        "nameFirst": "Damion",
        "nameLast": "Krajcik",
        "personTitle": "Chief Optimization Representative",
        "reviewContent": "What of it, if some old hunks of a sea-captain orders me to get a broom and sweep down the decks? What does that indignity amount to, weighed, I mean, in the scales of the New Testament? Do you think the archangel Gabriel thinks anything the less of me, because I promptly and respectfully obey that old hunks in that particular instance? Who ain’t a slave? Tell me that. Well, then, however the old sea-captains may order me about—however they may thump and punch me about, I have the satisfaction of knowing that it is all right; that everybody else is one way or other served in much the same way—either in a physical or metaphysical point of view, that is; and so the universal thump is passed round, and all hands should rub each other’s shoulder-blades, and be content.",
        "reviewTitle": "And still deeper the meaning of thatstory of Narcissus, who because he could not grasp the tormenting, mildimage he saw in the fountain, plunged into it and was drowned.",
        "score": 4
    },
    {
        "avatar": "https://robohash.org/neck.png?size=300x300",
        "date": "2030-12-13",
        "nameFirst": "Rebeka",
        "nameLast": "Mills",
        "personTitle": "Product Metrics Administrator",
        "reviewContent": "There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs—commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.",
        "reviewTitle": "Call me Ishmael.",
        "score": 3
    },
    {
        "avatar": "https://robohash.org/company.png?size=300x300",
        "date": "2029-12-09",
        "nameFirst": "Rozella",
        "nameLast": "Schmitt",
        "personTitle": "Investor Program Analyst",
        "reviewContent": "Once more. Say you are in the country; in some high land of lakes. Take almost any path you please, and ten to one it carries you down in a dale, and leaves you there by a pool in the stream. There is magic in it. Let the most absent-minded of men be plunged in his deepest reveries—stand that man on his legs, set his feet a-going, and he will infallibly lead you to water, if water there be in all that region. Should you ever be athirst in the great American desert, try this experiment, if your caravan happen to be supplied with a metaphysical professor. Yes, as every one knows, meditation and water are wedded for ever.",
        "reviewTitle": "Circumambulate the city of a dreamy Sabbath afternoon.",
        "score": 0
    },
    {
        "avatar": "https://robohash.org/love.png?size=300x300",
        "date": "2025-08-12",
        "nameFirst": "Rosalia",
        "nameLast": "Haag",
        "personTitle": "Customer Tactics Assistant",
        "reviewContent": "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
        "reviewTitle": "They must get just as nigh the water as they possibly can without falling in.",
        "score": 1
    }
]

const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }
}

async function fetchReviews() {
    try {
        const rawResponse = await fetch('https://app.fakejson.com/q', {
            ...requestOptions,
            body: JSON.stringify(payload),
        });
        return await rawResponse.json();
    } catch (error) {
        return error;
    }
}

/* Mock fetch call that resolves by default */
function mockFetch(status = true) {
    return new Promise((resolve, reject) => {
        if(status) {
            setTimeout(() => {
                resolve(mockResponse);
            }, 1000);
        }
        else {
            reject(new Error('Failed API fetch call'));
        }
    })
}

function createReviewCards() {
    const cardsContainer = document.getElementsByClassName('cards-container')[0];
    cardsContainer.textContent = '';

    // Change to fetchReviews() to actually call the API
    mockFetch().then((reviews) => {
        const reviewCards = reviews.map((review) => {
            let modal = createElement('div', ['modal']);
            let contentContainer = createElement('div', ['content-container']);
            let header = createElement('div', ['header']);
            let avatar = createElement('img', ['user-img'], '', { src: review.avatar });
            let div = createElement('div');
            let userContainer = createElement('p');
            let a = createElement('a', undefined, `${review.nameFirst} ${review.nameLast}`, { href: '#' });
            userContainer.append(a, ` - ${review.personTitle}`);
            let reviewDate = createElement('p', undefined, review.date, undefined);
            let reviewTitle = createElement('h3', undefined, review.reviewTitle);
            let reviewContent = createElement('p', ['text'], review.reviewContent);

            let productImg = createElement('img', ['product-img'], undefined, {src: './headphones.jpg'} );

            modal
                .appendChild(contentContainer)
                .appendChild(header);

            header.appendChild(avatar)
            header.appendChild(div);

            div.appendChild(userContainer);
            div.appendChild(reviewDate);

            modal.appendChild(productImg);

            contentContainer.appendChild(reviewTitle);
            contentContainer.appendChild(reviewContent);
            contentContainer.appendChild(createStars(review.score));
            return modal;
        });

        reviewCards.forEach(reviewCard => {
            cardsContainer.appendChild(reviewCard);
        });
    }).catch((error) => {
        let errorContainer = createElement('div', ['error-container']);
        let errorName = createElement('h1', ['error-name'], error.name);
        let errorMessage = createElement('h3', undefined, error.message);
        let errorStack = createElement('p', undefined, error.stack);

        errorContainer.appendChild(errorName);
        errorContainer.appendChild(errorMessage);
        errorContainer.appendChild(errorStack);
        cardsContainer.appendChild(errorContainer);
    })
}

function createStars(score) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    for(let i = 0; i < 5; i++) {
        let star = document.createElement('span');
        star.classList.add(i < score ? ACTIVE : INACTIVE);
        starContainer.appendChild(star);
    }
    return starContainer;
}

function createElement(tag, classStyle, textContent, attributes) {
    const node = document.createElement(tag);    
    if(classStyle !== undefined && classStyle !== null) {
        node.classList.add(...classStyle);
    }
    node.textContent = textContent;
    if(attributes !== undefined && attributes !== null) {
        Object.keys(attributes).forEach((key) => {
            node.setAttribute(key, attributes[key]);
        })
    }
    return node;
}