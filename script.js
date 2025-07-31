let pre_loader = document.querySelector(".pre_loader");
let app = document.querySelector(".app");
function loader() {
    pre_loader.classList.add("none");
    app.classList.add("active");
    if (pre_loader.classList.contains("none")) {
        clearInterval(interval);
    }
}

let interval = setInterval(loader, 3000);
