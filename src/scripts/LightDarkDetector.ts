const body = document.querySelector('body');
const changer = document.getElementById('changer');
const img = changer?.querySelector("img");

const FromLightToDark = () => {

    if(!body) return

    body.classList.remove('light');
    body.classList.add('dark');
    window.localStorage.setItem("mode", "dark");

    if(img) img.src = "/icons/light.svg";

}

const FromDarkToLight = () => {

    if(!body) return

    body.classList.remove('dark');
    body.classList.add('light');
    window.localStorage.setItem("mode", "light");

    if(img) img.src = "/icons/dark.svg";
}



if (window.localStorage.getItem("mode")){
    if(window.localStorage.getItem("mode") == 'dark') FromLightToDark();
    else FromDarkToLight();
}
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    FromLightToDark();
}

function changemode () {
    if(!body) return

    if(body.classList.contains('light')){
        FromLightToDark();
        return;
    }
    FromDarkToLight();
}

changer?.addEventListener("click", changemode);