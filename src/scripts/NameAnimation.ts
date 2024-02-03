//getting the holder of names
const nameHolder = document.getElementById("myname");

//find the height of the name holder
const height = nameHolder?.getBoundingClientRect().height;

//fix its height
if(nameHolder){
    nameHolder.style.overflow = "hidden"
    nameHolder.style.height = `${height}px`;
}

//getting the acutal name
const nameIn = nameHolder?.innerText;
//ascii related variables for 
const ASCII_START_CAPITAL = 65;
const ASCII_START_SMALL = 97;
const BASE_LOOP_TIMES = 1;

//see if the user has reduced animations
const query = window.matchMedia('(prefers-reduced-motion: reduce)');

const nameLength = nameIn?.length || 0;

//creating a vatiable to store all the in betwwen name
let newName:Array<string> = [];
newName.fill('a',0,nameIn?.length);


// using a pomise to create a sleep function
let sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// calculation for
let iterations = 0;
let flag = 0



//hack for top level await, could be done in a better way? maybe... but did not do
if(!query.matches)
(async()=>{while(1){

    // if(window.innerWidth < 500) return;

    if(!nameIn) return;

    for(let i = 0; i < nameLength; i++){
        const BOUNDARY = BASE_LOOP_TIMES + i; 
        
        if(nameIn.charAt(i) == ' '){
            newName[i] = nameIn[i];
            continue;
        }


        if(iterations > BOUNDARY){
            newName[i] = nameIn[i];
            nameHolder.innerText = newName.join('');
            if(i == nameLength - 1) flag = 1 
            continue;
        }
    
        if(nameIn[i] == ' ') { 
            newName[i] = ' '; 
            continue;
        }

        let startBlock = ASCII_START_SMALL;
        if(nameIn.charCodeAt(i) >= 65 && nameIn.charCodeAt(i) <= 90) startBlock = ASCII_START_CAPITAL;
        
        let code = null;

        do{
            code = startBlock + Math.floor(Math.random() * 26);
        }while(code == nameIn.charCodeAt(i))

        let newLetter = String.fromCharCode(code);
        newName[i] = newLetter;     
        nameHolder.innerText = newName.join('');
    }
    iterations += 1;
    await sleep(50);
    if(flag == 1) break;
}})();



