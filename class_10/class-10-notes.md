## Agenda

1. Housekeeping
2. Reading Discussion #3
3. CSS Positioning
4. Project #2 AMA
## Housekeeping

1. Attendance
2. Project #2 due 10/8
3. Reading #3 due 10/13

## Reading Discussion #3

## CSS Positioning

### Quick Reference
| Word        | Definition                                                                           | Example                                   |
| ----------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| Normal Flow | Regular flow layout of a document using the box model with block and inline elements |                                           |
| Position    | A CSS property that determines where an element exists on a page                     | `static`, `relative`, `absolute`, `fixed` |
### Reference Links to Review
- Tania Rascia [Positioning tutorial](https://www.taniarascia.com/overview-of-css-concepts/#layouts-positioning)
- MDN [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) documentation
- MDN [position tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning)
#### Review: Box Model

The box model is how each container (meaning html elements/tags) is structured, according to its content and the css attribute that you are modifying.  
![box model](https://kagi.com/proxy/boxmodel.png?c=2AqQH3HdLpAllo0tKOQJ0ZPmYW4cjhd-rRnTLdfoPuEIxP-LId4EU4OimOAXtQuZTHY8e37PbHkIAA2Gcf1yY0hAwsB-MdvRDobh_krfcAU%3D)

#### Review: Flow Layout

The way html is structured is through the flow layout: each page comprises `block` and `inline` elements to construct each page. This is like a stack of documents, it reads from the top to the bottom according to how big the page is and how much content you have.

| block                                                                                                                                                             | inline                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `block` elements are stacked vertically, so they typically won't have content next to it. Think of it in like a word document where you have images "break" text. | `inline` elements are stacked horizontally, so they will usually have content side-by-side. In a word document, it is also called inline. |
| ![block](https://github.com/samheckle/images/blob/main/wp1/block.png?raw=true)                                                                                    | ![inline](https://github.com/samheckle/images/blob/main/wp1/inline.png?raw=true)                                                          |
| `<p>`, `<div>`                                                                                                                                                    | `<em>`, `<strong>`, `<a>`, `<span>`                                                                                                       |

#### Breaking the "Normal" Flow: `display`, `float`, `overflow`

Manipulating the `display` property allows us to change the flow of elements in a HTML document between horizontally / vertically stacked. 

Changing `float` allows inline elements (including text) to wrap around it. 

`overflow` allows us to enable / disable scroll on a container. 

**Important Note**: If you notice a small scroll on `body`, you probably have some issue with margins. There are a couple of ways to navigate around this:

```css
body{
	margin: 0;
}
```
Or, you can remove the scroll entirely:

```css
body{
	overflow-y: hidden;
}
```

If you notice the tiniest bit of a scroll on the body, typically we want to *remove* it because it is bad web practice.  Try both these methods and see which one works best for your project. 
### The `position` CSS Property

`position` is a CSS property that defaults to `static`, which ensures elements fall into the normal flow of a webpage. We can manipulate the normal flow by changing the `display`, `float`, or `overflow`, or with `position`.

`position` can have 4 typical values:
- `static`: default value
	- normal flow *enabled*
- `relative`: sets the origin position of the child elements
	- normal flow *enabled*
- `absolute`: positioned according to the `relative` parent container. 
	- normal flow **disabled**
- `fixed`: same position regardless of scroll
	- normal flow **disabled**
- `sticky`: has an initial relative (normal) position and keeps position when scrolled
	- normal flow *enabled*

**Important Note**: If you use `position: absolute`, you ***need*** to give a parent element `position: relative` to set the origin point. This will allow you to say exactly how many pixels from the origin point as opposed to the top-left corner of the webpage. 

![absolute](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context/Example_1/understanding_zindex_05a.png)

We are seeing these words `relative` and `absolute` a lot, but in the context of CSS it means setting the origin point and how an element position is specified. 

On any element that has `absolute`, `fixed` or `sticky`, we can specify how far from the origin that box is positioned using `top`, `left`, `bottom`, and `right` properties. 

### The `z-index` CSS Property

We can choose how items are layered using `z-index`. A higher number means it is closer towards the user, a lower number is further away. Think of these as customizable layers. 

If you know you want something to always be in the background:

```css
.move-to-back{
	z-index: -999;
}
.move-to-front{
	z-index: 999;
}
```

## Project #2 AMA 

Any questions to address for project #2?
