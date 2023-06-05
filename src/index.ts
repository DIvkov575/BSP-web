// import {animatera} from "./three-stuff.js";
import "./three-stuff.js";
import "./main.scss";
import "./assets/dmitriyI.png";
import "./assets/favicon.svg";
let three = require("./three-stuff.js");


const elementIsVisible = (el: Element, displacement: number = 0): Boolean => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight))
};

let width = window.innerWidth;
let e1 = document.querySelector("#ChooseUs-scroll-padding");
let e1_1 = document.querySelector(".ChooseUs");
let e2 = document.querySelector(".py101");
let e3 = document.querySelector(".pricing-div");

let canv = new three.FullCanvas();

window.onscroll = () => {
    canv.moveCamera();
    if (e1 != null && e1_1 !=null) {
        if (elementIsVisible(e1_1)) {
            e1_1.classList.add("smooth_to_square_0");
        } else {
            e1_1.classList.remove("smooth_to_square_0");
        }
    }
    if (e2 != null) {
        if (elementIsVisible(e2)) {
            e2.classList.add("smooth_to_square_1");
        } else {
            e2.classList.remove("smooth_to_square_1");
        }
    }

    if (e3 != null) {
        if (elementIsVisible(e3)) {
            e3.classList.add("smooth_to_square_2");
        } else {
            e3.classList.remove("smooth_to_square_2");
        }
    }
}

console.log("TS connected");
canv.moveCamera()
canv.animate()
