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
// let e1 = document.querySelector("#ChooseUs-scroll-padding");
let e1: HTMLElement = document.querySelector(".ChooseUs") as HTMLElement;
let e2: HTMLElement = document.querySelector(".py101") as HTMLElement;
let e3: HTMLElement = document.querySelector(".pricing-div") as HTMLElement;

let canv = new three.FullCanvas();

window.onscroll = () => {
    canv.moveCamera();
    // if (e1 != null) {
    //     if (elementIsVisible(e1)) {
    //         e1.classList.add("smooth_to_square");
    //     }
    // }
    // if (e2 != null) {
    //     if (elementIsVisible(e2)) {
    //         e2.classList.add("smooth_to_square");
    //     }
    // }

    // if (e3 != null) {
    //     if (elementIsVisible(e3)) {
    //         e3.classList.add("smooth_to_square");
    //     }
    // }
}

console.log("TS connected");
canv.moveCamera()
canv.animate()
