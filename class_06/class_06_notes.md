## Agenda

1. Housekeeping
2. Finish Project 1 Presentations
3. Introduction to JavaScript and the DOM

## Housekeeping

1. Attendance
2. Reading #2 due next class
3. Project #2 Concept due next week

## Finish Project 1 Presentations

## Review HTML/CSS so far

Download the [starter code](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fsamheckle%2Fnetworked-media-fa-26%2Ftree%2Fmain%2Fclass_05%2Fclass_5_starter) and add it to your class-demos folder. 
## Introduction to JavaScript and the DOM

## Quick Reference

| Word                 | Definition                                                                                                                                                            | Example                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Algorithm            | A series of steps that execute to solve a problem                                                                                                                     |                                                                 |
| Javascript           | A programming language that is used to make webpages interactive                                                                                                      | `script.js`                                                     |
| Function / Method    | A single instruction or command. May or may not have **parameters**. You can use function and method interchangably. Functions usually use the syntax `()` and `{}`   | `function hi(){}`, `hi()`                                       |
| Parameter / Argument | A value that is passed in to the parentheses of a function. You can use the word parameter and argument interchangeably.                                              | `document.getElementById('main')`                               |
| Variable             | A piece of data stored in a value. JavaScript doesn't keep track of types in the variable declaration, but does know the type (`Number`, `String`, or `Boolean`)      | `let x = 10`<br>`let word = 'rainy day'`<br>`let sunny = false` |
| DOM                  | The Document Object Model is how JavaScript "sees" the HTML structure of a webpage to manipulate it. It is not a programming language, but JavaScript "uses" the DOM. | Using `document` in a `.js` file.                               |
| callback             | A function parameter that is passed into another function.                                                                                                            | `function hi( ()=>{} )`                                         |

### Reference Links to Review
- MDN [definition of JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- MDN guide: [Learn JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)
- My [JavaScript Cheatsheet](https://samheckle.github.io/how-to/write-javascript)

## What is JavaScript?

JavaScript is a scripting language that allows you to incorporate interactions on a web page. 

| Structure | Style | Interaction |
| --------- | ----- | ----------- |
| HTML      | CSS   | JavaScript  |

It allows us to sense input from users and make dynamic changes on our webpage. Some of these can be done with CSS (like `:hover`), but more complex inputs require JavaScript.
## What is the DOM?

When running in the browser, Javascript has access to the *Document Object Model*, or the DOM of an HTML page. This is a representation of the entire HTML structure of the page, which Javascript can manipulate in order to make structure, content or styling changes. It has a tree-like structure (remember, HTML is made up of nested tags,) something like the image below:

![https://www.w3schools.com/js/pic_htmltree.gif](https://www.w3schools.com/js/pic_htmltree.gif)

With the object model, JavaScript gets all the power it needs to create dynamic HTML:

- JavaScript can change all the HTML elements in the page
- JavaScript can change all the HTML attributes in the page
- JavaScript can change all the CSS styles in the page
- JavaScript can remove existing HTML elements and attributes
- JavaScript can add new HTML elements and attributes
- JavaScript can react to all existing HTML events in the page (user events, such as clicking or key presses, we will talk about them in a future tutorial)
- JavaScript can create new HTML events in the page

This means that anything you could create, change or remove manually when writing HTML or CSS can also be manipulated in Javascript, through the DOM.

## Adding Javascript to a website

Before working with the DOM, we need to first be able to import a Javascript file into our websites. This is pretty similar to how we import stylesheets, but *instead* of using the `link` tag we use the `script` tag.

```html
<html>
	<head>
		<script src="main.js"></script>
	</head>
	
	<body>
		Nothing to see here.
	</body>
</html>
```

## Writing JavaScript

JavaScript is the last language we will be learning in this class. For us, it allows us to add interactions using another file type. Each `.js` file (and typically any programming file) is known as an "algorithm" or a series of steps executed to solve a problem. JavaScript is read like HTML in the browser - it starts at the top and reads each line of code in order. 

#### Comments

A comment is a way in javascript to write notes and organize your code.

```js
// this is a comment
// we write comments in our code to explain what is going on and to organize ourselves
// you don't need to copy the comments i write, you are welcome to take your own notes
// Hotkeys:
// Mac: ⌘+/
// PC: CTRL+/
```
#### Function

A function is a single action to be executed by the code. 

```js
// the syntax of a function is the name followed by parenthesis
functionName();
```

#### Parameter

A parameter is a value you are putting inside the parenthesis. 

```js
// parameters go inside the parenthesis
functionName(parameterValue);
```

### Adding our first function

And, we can write a simple piece of Javascript code which just alerts us of the fact that it was imported in the page. [See the MDN reference for `alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert).

```jsx
// name of the function is alert
// parameter is in '' which is the text to be displayed. 
alert('Hello this is Javascript speaking!')
console.log('This is a message in the console')
```
### Functions with Callbacks

A function with a parameter that is also a function is known as a "callback" function. We usually pass in an *anonymous arrow function*, or a function that is not named and has silly syntax, into the parameter. 

```js
// variable holding arrow function
let greetings = () => { console.log('hi') }

// using variable in parameter as callback function
// per the assignment above, greetings = () => { console.log('hi') }
foo.get(greetings)

// we could also write an anonymous function instead of using variable
foo.get( ()=>{console.log('hi')} )
```

See [Custom Functions in the JavaScript cheatsheet](https://samheckle.github.io/how-to/write-javascript#custom-functions).
### Waiting for the DOM to load

Interacting with the DOM can only happen *once the HTML content of the page has loaded*. Since our JS script might load before the actual HTML of the page, we need a way of *listening* for when the HTML page has completed loading everything. Fortunately, there is an easy solution for that:

``` js
// window = the browser window
// addEventListener() = the function, which has 2 parameters separated by a ,
// "load" = first parameter (which type of event we are waiting for)
// ()=>{} = second parameter, a callback function
window.addEventListener("load", () => {
	console.log("page is fully loaded");
})
```
#### `window.onload`

There is also a shorthand for the above the event listener:

```js
// this is a shorthand for the event listener
window.onload = () => {
  console.log("page is fully loaded");
};
```

This is an event that is specific to the webpage loading. We can view the details of the load event [from the MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event). In this class, we will *always* use the load event, instead of `DOMContentLoaded`.

The reason for this is that `window.onload` is the *last* event to trigger when a page loads. Take a look at this [playground](https://developer.mozilla.org/en-US/play?uuid=624b9c36-c62a-41c6-9624-375d0ae85293&state=jVPBctowEP2VHaUHmIJh0kvHMbm0vdHpTNOjDxhpASWylEpyiMvw711JNnEG2uHEavfte2%2FXy4HtfK1YzgohX4CryrlFybjR3hrlSnZfaoBi3XhvNEhBNYvKVKJk4NtnpHeqEfJnLBSzlKDGYkac9EvRkBxfUPupMtueXVVrVLAxti8uY%2B1bCIFweTGLkIT2%2BOori1V4AFAgjFZtep1JTMMkFNMkHd7sA%2BBz%2F%2BY0Jb0%2FzftEnHHgopj1goOJ2IRx52hrayNaOIROId2zqtoctlaKu5AJwdRjTWmP08DgcjjtFuICCHgMC8r6jSey2Bo6cugKd%2B80NgpfY6ZScqunklSIm5NptDH%2F2DgvN20%2F%2FqCW5E4LOtOj3DnqtMYEt%2BjkH8xBG409OH6hSam7U3m%2Fk7Uy%2FKlH3qQLSpAdyu2O%2FN1arBOAdvsYVkuSLn5%2BWIAwvKlJP%2FvdoG0fUCH3xo5KdsFiycZElLo7pf8Q3PTnHJpKnV5ZJUS8vqV0xIkByJXkTyWbwGgMi%2FtknmSzcB1fkjTp0BWx%2BAEc%2Bl%2ByRtP40aABYC%2B1MPuM9lF5aXSWBEfeNjiOjccJ3M7nIT4mS13HBUvJODmKS%2Fi3rY%2FBVwQTH3tjPi3lAnf4X7XO0%2BXyXaW3eKXO6q0vhw%2BHk0JMP4T0kUysrvPw9cf3jnpJ5vHaWVdnfQNFui6%2FwxrpwFS4PHb8Cw%3D%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow%2Fload_event%2F) to see the differences.

### Selecting an Element on the Page using the DOM

There are a few ways to select which HTML elements to modify. 

As a reminder:
- `class`: can be used many times per page
- `id`: can only be used ONCE per page

This is useful for us because if we want to manipulate something with JavaScript we need to select the specific element we want to modify.

There are four JavaScript selectors that you will see and are used. They use the `document` from the DOM to reference where these functions are coming from, then the name of the function with a string (a word wrapped in `''` or `""`) parameter.

- `document.getElementById('')` → grabs a **single** element using the `id` attribute
- `document.querySelector('')`→ returns a **single** element that first matches the CSS selector string.
- `document.getElementsByClassName('')`→ grabs **many** elements using the `class`. This also returns an array instead of an individual item. *We typically do not do this*.
- `document.querySelectorAll('')` → returns **many** elements that match the CSS selector string.

Right now, the easiest are grabbing individual elements to manipulate, so we will focus on `document.getElementById('')` and `document.querySelector('')`

### Different types of selectors; changing the content of an element

Starting with the following HTML page:

```jsx
<html>
	<head>
		<script src="script.js"></script> <!-- This is our own script -->
	</head>

	<body>
		<p> This is a paragraph </p>
		<p id="importantParagraph"> This is an important paragraph </p>
		<p class="blue-paragraph"> This is a blue paragraph </p>
		<p class="blue-paragraph"> This is another blue paragraph. </p>
	</body>
</html>
```

We have four paragraphs. One of them has no attributes, one of them has an `id`, and the other two have an identical `class` attribute. The code below uses the `innerHTML()` function inside Javascript in order to change the content of our paragraphs. Using different selectors, we can achieve different outcomes:

```jsx
window.onload = () => {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").textContent = "updated content with javascript";
};
```

### Changing the styling of an element

We can use JavaScript to directly specify CSS properties for the elements we have selected. In the example below, we make the paragraphs which have the `blue-paragraph` class actually have blue text (on a pink background.)

```jsx
<html>
	<head>
		<script src="script.js"></script> <!-- This is our own script -->
	</head>

	<body>
		<p> This is a paragraph </p>
		<p id="importantParagraph"> This is an important paragraph </p>
		<p class="blue-paragraph"> This is a blue paragraph </p>
		<p class="blue-paragraph"> This is another blue paragraph. </p>
	</body>
</html>
```

```jsx

window.onload = () => {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").textContent = "updated content with javascript";

  document.getElementById("importantParagraph").style.color = "blue";

  // you can update the style attribute more than once using different properties
  document.getElementById("importantParagraph").style.backgroundColor = "green";
};
```

Many of the attributes are the same between updating with JavaScript and writing with CSS, with different cases instead of hyphens. You can see a list of the attributes you can change [here](https://www.w3schools.com/jsref/dom_obj_style.asp

We can also use JavaScript to assign a class to an element that doesn’t already have it, or conversely, to remove a class from an element which does have it. For the former, we could write the code below in order to programatically give the `importantParagraph` a `blue-paragraph` class as well. The `addClass` function 

```jsx
window.onload = () => {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").innerHTML = "updated content with javascript";

  document.getElementById("importantParagraph").classList.add('blue-paragraph');
};
```

### Using Variables

Variables are named data that help us shorten our code. We create variables by using the keyword `let` followed by the variable name eg. `let x = 10`. If we are making a lot of changes to the same item in the document, we can create a variable to not write `document.getElementById('importantParagraph)` over and over again.

```js
window.onload = () => {
  console.log("page is fully loaded");
  
  let important = document.getElementById('importantParagraph');
  
  important.innerHTML = "updated content with javascript";
  important.classList.add('blue-paragraph');
};
```
### Creating and removing HTML elements

We can also use JavaScript in order to create entirely new elements, or remove existing elements.

I’ll start with removing, since it’s easier. Once we figure out our selector, we simply call `.remove()` on the value returned by the selector in order to entirely remove the element from the DOM. 

```jsx
window.onload = () => {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").remove();
}
```

Creating a new element is a two-step process. First, we need to know what type of element we want, and what its corresponding HTML tag is. Second, we need to find an already existing element on the HTML page, and add our newly created element to it. Remember, HTML has a tree-like structure, and if we don’t add our new element to this tree, as another element’s child, the newly created element will simply not show up.

```jsx
<html>
	<head>
		<script src="script.js"></script> <!-- This is our own script -->
	</head>
	
	<body>
		<div id="container">

		</div>
	</body>
</html>
```

Let’s use this HTML page, and use JavaScript to add a paragraph inside of the `container` div.

```jsx
window.onload = () => {
  console.log("page is fully loaded");
  // find the tag name of the element you want to create
  // p is paragraph tag
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = "this is a new paragraph";
  let container = document.getElementById("container");
  container.appendChild(newParagraph);
}
```