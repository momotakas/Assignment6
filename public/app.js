// const reviews = [
//     // make your own content here
//     {
//         name: "sock puppet 1",
//         img: "item-1.jpg",
//         description: "this is one sock puppet",
//         stars: 2,
//         reviewText: "it's pretty good i guess"
//     },
//     {
//         name: "sock puppet 2",
//         img: "item-2.jpg",
//         description: "this is another sock puppet",
//         stars: 3,
//         reviewText: "it's better than the other one"
//     }
// ];
const reviews = [];
let currItem = 0;
getData();
async function getData() {
	const response = await fetch('/api');
	const data = await response.json();
	console.log("got data: "+data);
	for (item of data.rows) {
		reviews.push({
            name: item.doc.name,
            img: item.doc.img,
            description: item.doc.description,
            stars: item.doc.stars,
            reviewText: item.doc.reviewText
        });
	}
    showItem(currItem);
}



const img = document.getElementById('item-img');
const name = document.getElementById('name');
const description = document.getElementById('description');
const stars = document.getElementById('stars');
const reviewText = document.getElementById('reviewText');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randBtn = document.querySelector('.random-btn');
// make two more query selectors here for next button and random button

// // set initial item number
// let currItem = 0;
// showItem(currItem);
// load initial item
/*
window.addEventListener('DOMContentLoaded', () => {
    // get object from array
    getData();
    console.log(currItem);
    const item = reviews[currItem];
    console.log(item);
    // replace the src property of the DOM element with an id of 'img'
    img.src = item.img;
    // replace the text of the 'name', 'description' and 
    // 'review_text' id elements
    name.textContent = item.name;
    description.textContent = item.description;
    reviewText.textContent = item.reviewText;
    // clear contents of 'stars' id element
    while (stars.firstChild) {
        stars.removeChild(stars.firstChild);
    }
    // this loops over the number of stars in item.stars
    // and pushes new span elements with star icons
    // into the stars DOM element
    const fragment = new DocumentFragment();
    for (let j = 0; j < item.stars; j++) {
        const i = document.createElement("span");
        i.textContent = "star_rate";
        i.className = "material-icons";
        fragment.append(i);
    }
    stars.append(fragment);
});
*/
// show item based on currItem
function showItem(itemNum) {
    const item = reviews[itemNum];
    console.log(item);
    img.src = 'images/' + item.img;
    name.textContent = item.name;
    description.textContent = item.description;
    while (stars.firstChild) {
        stars.removeChild(stars.firstChild);
    }
    const fragment = new DocumentFragment();
    for (let j = 0; j < item.stars; j++) {
        const i = document.createElement("span");
        i.textContent = "star_rate";
        i.className = "material-icons";
        fragment.append(i);
    }
    stars.append(fragment);

    reviewText.textContent = item.reviewText;
}
// show next item
nextBtn.addEventListener('click', () => {
    currItem++;
    if (currItem > reviews.length - 1) {
        currItem = 0;
    }
    showItem(currItem);
});

prevBtn.addEventListener('click', () => {
    currItem--;
    if (currItem > reviews.length - 1) {
        currItem = 0;
    }
    showItem(currItem);
});

randBtn.addEventListener('click', () => {
    // currItem--;
    currItem = Math.floor(Math.random() * reviews.length);
    console.log(currItem);
    if (currItem > reviews.length - 1) {
        currItem = 0;
    }
    showItem(currItem);
});

// write code here to show random item
