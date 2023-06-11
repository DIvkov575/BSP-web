const three = require("./three-stuff.js");
import "./main.scss";
import "./assets/favicon.svg";

let canv = new three.FullCanvas();
if (visualViewport != null) {visualViewport.addEventListener("resize", (event) => {canv = new three.FullCanvas();});}
window.onscroll = () => {canv.moveCamera();}
canv.moveCamera()
canv.animate()

const form = <HTMLFormElement> document.getElementById('form1'); 
const termsButton= <HTMLInputElement> document.getElementById('check1');
const button1: HTMLElement= document.querySelector("#b2") as HTMLElement;
button1.addEventListener('click', buttonFunc1);

function buttonFunc1(e: Event){
    e.preventDefault()
    let input = []

    input.push((form.elements[0] as HTMLInputElement).value);
    for (let i = 1; i < 3; i++){
        if ((form.elements[i] as HTMLInputElement).value.length <= 1) {alert("Input value too short or Missing"); return;}
        if ((form.elements[i] as HTMLInputElement).value.length >= 50) { alert("Please shorten input"); return;}
        input.push((form.elements[i] as HTMLInputElement).value)
    }
    if (!termsButton.checked) {alert("Please check that you have read terms and conditions"); return;}
    submit(input)
    form.reset();
}

async function submit(input: String[]){
    // console.log(input)
    const res = await fetch(window.location.href, {
        method: 'POST',
        headers: {
        "Content-Type":"application/json"
    },
        body: JSON.stringify({
        parcel: input.join(', ') 
        })
    })
    alert("Message Sending");
}

console.log("TS connected");

    
    
