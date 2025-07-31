let pre_loader = document.querySelector(".pre_loader");

function loader() {
    pre_loader.style.display = "none";
}

let interval = setInterval(loader, 3000);
