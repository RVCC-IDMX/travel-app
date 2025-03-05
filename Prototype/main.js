document.querySelector(".Destinations").addEventListener("mouseover", (e) => {
    console.log("hover");
});

function myFunction() {
    var x = document.getElementById("myMenu");
    if (x.className === "Menu") {
        x.className = "responsive"; 
    } else {
        x.className = "Menu";
    }
}

// Function to toggle dropdown visibility
function toggleDropdown(event) {
    event.stopPropagation(); 
    const targetDropdown = document.getElementById(event.currentTarget.dataset.target);


    // Closes other dropdowns before opening the clicked one
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== targetDropdown) {
            menu.classList.remove("show");
        }
    });

    targetDropdown.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
    const regionButtons = document.querySelectorAll(".region-btn");

    regionButtons.forEach((button) => {
        button.addEventListener("click", toggleDropdown);
    });

    // Close dropdown when clicking anywhere outside of it
    document.addEventListener("click", (e) => {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            if (!menu.contains(e.target) && !e.target.classList.contains("region-btn")) {
                menu.classList.remove("show");
            }
        });
    });
});




