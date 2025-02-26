document.querySelector(".Destinations").addEventListener("mouseover",(e) => {
    console.log("hover")
})

function myFunction() {
    var x =
    document.getElementById("myMenu");
    if (x.className === "Menu") {
        x.className === " responsive";
    } else {
        x.className = "Menu";
    }
}

