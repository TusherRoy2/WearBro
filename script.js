let pre_loader = document.querySelector(".pre_loader");
function loader() {
    pre_loader.classList.add("none");
    if (pre_loader.classList.contains("none")) {
        clearInterval(interval);
    }
}

let interval = setInterval(loader, 3000);
