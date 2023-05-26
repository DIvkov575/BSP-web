import "./three-stuff.js";
import "./main.scss";
console.log("TS connected");

const elementIsVisibleInViewport = (el: Element, displacement: number = 0): Boolean => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight))
};

let elem = document.querySelector("#b1");
if (elem != null) {
    elem.classList.add("round_corners");
}
