// this is a comment
// syntax is //

alert('javascript!');

console.log('log this info to the console');

// global variables
let colors = ['#360568', '#5b2a86', '#7785ac', '#9ac6c5', '#a5e6ba'];

// shorthand for waiting for the webpage to load
// window.onload is similar to the setup/draw
// all of our code *should* go inside of the window.onload
window.onload = () => {
	console.log('page has loaded');

	// get element by id
	// retrieves a SINGLE js element using an id
	let mainElement = document.getElementById('main');
	// modifying a style using js
	// js has highest priority and will overwrite any css rules
	mainElement.style.color = 'white';
	console.log(mainElement);

	// query selector
	// retrieves a SINGLE element using the CSS selector
	// using querySelector only grabs the first element in html that matches
	let firstParagraph = document.querySelector('p');
	let blueParagraph = document.querySelector('.blue');
	document.querySelector('#main');

	firstParagraph.textContent = 'i have updated the text with js';
	blueParagraph.style.backgroundColor = 'navy';

	// query selector for ID works the same as getElementById
	let containerDiv = document.querySelector('#blue-div');
	for (let i = 0; i < 60; i++) {
		// creating an element on a webpage:
		// 1. declare what type of element we are creating
		let newSpan = document.createElement('span');
		// 2. modify that element / content
		newSpan.textContent = 'new span';
		////////////////////////////////////////
		// FIX FOR IN CLASS
		// adding inline-block display because rotation cannot apply to inline styles
		////////////////////////////////////////
		newSpan.style.display = 'inline-block';
		newSpan.classList.add('all-spans');
		// generate a random color
		let c = Math.floor(Math.random() * colors.length);
		newSpan.style.backgroundColor = colors[c];
		// 3. add the created element to the page
		// anywhere on the bottom of the html: document.body
		// in a specific container: select that element
		containerDiv.appendChild(newSpan);
	}

	// set interval is built-in to js
	// 2 params:
	// 1. callback
	// 2. amount of time in ms
	// setInterval(function () {}, 2000)
	// setInterval(intervalFunction, 2000)
	setInterval(() => {
        console.log('two seconds have passed')
        // two ways to retrieve all the elements of a class
        let allSpans = document.getElementsByClassName('all-spans')
        // let allSpans = document.querySelectorAll('.all-spans')
        // shorthand for(let s = 0; s < allSpans.length; s++)
        for(let s of allSpans){
            let rotation = 0;
            if (s.style.rotate){
                rotation = parseInt(s.style.rotate);
            } 
            rotation++; 
            // ` (backtick) is above tab and next to 1
            s.style.rotate = `${rotation}deg`
            // string literals are the same as string concatenation
            // s.style.transform = "rotate(" + rotation + "deg)";
        }
    }, 50);
};

// helper functions go after window.onload {}
function intervalFunction(){

}
