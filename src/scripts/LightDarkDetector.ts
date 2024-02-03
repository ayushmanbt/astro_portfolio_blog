const body = document.querySelector('body');
const changer = document.getElementById('changer');
let isSystemMode = false;
const lightButton = document.getElementById("light_button");
const darkButton = document.getElementById("dark_button");
const systemButton = document.getElementById("system_button");
const dialog = document.getElementById("menu");

let el;

const FromLightToDark = () => {
    if(!body) return
    body.classList.remove('light');
    body.classList.add('dark');
}

const FromDarkToLight = () => {
    if(!body) return
    body.classList.remove('dark');
    body.classList.add('light');
}


const setButtons = ()=>{
    if(darkButton && lightButton && systemButton){
        if(isSystemMode) {
            systemButton.style.display = 'none';
            darkButton.style.display = 'block';
            lightButton.style.display = 'block';
        }
        else if(body?.classList.contains('light')) {
            lightButton.style.display = 'none';
            darkButton.style.display = 'block';
            systemButton.style.display = 'block';
        }
        else if(body?.classList.contains('dark')) {
            darkButton.style.display = 'none';
            lightButton.style.display = 'block';
            systemButton.style.display = 'block';
        }
        
    }    
}    


const FromSystem = () => {
    isSystemMode = true;
    window.localStorage.setItem("mode", "system");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        FromLightToDark();
    }
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        FromDarkToLight();
    }
    
    el = window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change',({ matches }) => {
      if (matches) {
        FromDarkToLight();
      } else {
        FromLightToDark();
      }
    })

    setButtons();
    dialog?.close();
}

function changemode () {
    if(!body) return
    isSystemMode = false; 
    if(body.classList.contains('light')){
        FromLightToDark();
        window.localStorage.setItem("mode", "dark");
    }
    else{
        FromDarkToLight();
        window.localStorage.setItem("mode", "light");
    }
    setButtons();
    if(el) window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change", el);
    dialog?.close();
}

// changer?.addEventListener("click", changemode);



changer?.addEventListener("click", () => {
    dialog.showModal()
    dialog?.classList.add("scaleup");
    dialog?.addEventListener("animationend", function(){
        dialog.classList.remove("scaleup");
    })
});

lightButton?.addEventListener("click", changemode);
darkButton?.addEventListener("click", changemode);
systemButton?.addEventListener("click", FromSystem);

if(window.localStorage.getItem("mode") == "light"){
    console.log("Why did I do this?");
}
else if(window.localStorage.getItem("mode") == "dark"){
    changemode();
}
else{
    FromSystem();
    isSystemMode = true;
}

setButtons();