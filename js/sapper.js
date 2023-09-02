// const windowInnerHeight = window.innerHeight;
// let vkladka = document.querySelector(".container");
// vkladka.style.height = `${windowInnerHeight}px`;
// window.addEventListener(`resize`, function() {
//     windowInnerHeight = window.innerHeight;
//     vkladka.style.height = `${windowInnerHeight}px`;
// });






const roleBoard = document.getElementById("roleBoard");
const Board = document.getElementById("Board");

function trampoline(fn) {
    return function(...args) {
      let result = fn.apply(fn.context, args)
      while (typeof result === 'function') {
        result = result()
      }
  
      return result
    }
}

//Напишем декоратор, который будет принимать измененную рекурсивную функцию(следующий шаг) и исполнять ее в цикле, без увеличения глубины вызовов.
//Теперь наша рекурсивная функция должна возвращать функцию, которая будет сразу исполняться декоратором. Таким способом, мы условно сделаем массив функций и исполним их по очереди. Но поскольку мы каждый раз возвращаем новую анонимную функцию, этот код будет работать несколько медленнее.

class Block  {
    board = null;
    status= null;
    role= "block";
    isFlagged = false;
    y= null;
    x= null;
    size = 35;

    boardAppend() {
        let object = document.createElement("div");
        object.classList.add(this.role);
        object.setAttribute("role",this.role);
        object.setAttribute("x",this.x);
        object.setAttribute("y",this.y);
        object.setAttribute("size",this.size);
        this.board.append(object);
    }

    GameBoardAppend() {
        let object = document.createElement("div");
        object.classList.add(this.role);
        object.setAttribute("role",this.role);
        object.setAttribute("x",this.x);
        object.setAttribute("y",this.y);
        object.setAttribute("status",this.status);
        object.setAttribute("isFlagged",false);
        object.setAttribute("size",this.size);
        object.setAttribute("oncontextmenu","flagTrigger();return false");
        this.board.append(object);
    }
}

let boardLen = 20;
let bomb = 50;

let flagBox = document.querySelector(".flagNum");
flagBox.textContent = 50;

function flagTrigger(e) {
    e = event.target;
    if ( e.getAttribute("isFlagged") === "false") {
        e.setAttribute("isFlagged","flagged");
        flagChecker();
    }
    else if ( e.getAttribute("isFlagged") === "flagged") {
        e.setAttribute("isFlagged","false");
        flagChecker();
    }
}

function BoardCreater() {
    for (let y = 1; y < boardLen + 1; y++) {
        for (let x = 1; x < boardLen + 1; x++) {
            let object = new Block;
            object.board = document.getElementById("roleBoard");
            object.role = "block";
            object.x = x;
            object.y = y;
            object.boardAppend();
        }
    }
}

function GameBoardCreater() {
    for (let y = 1; y < boardLen + 1; y++) {
        for (let x = 1; x < boardLen + 1; x++) {
            let object = new Block;
            object.board = document.getElementById("Board");
            object.role = "block";
            object.status = "closed"
            object.x = x;
            object.y = y;
            object.GameBoardAppend();
        }
    }
}


// нужно распределить роли (значки)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function roleSetter() {
    let num = 0;
    setter: while (num < bomb) {
        let x = getRandomIntInclusive(1, boardLen);
        let y = getRandomIntInclusive(1, boardLen);
        let i = roleBoard.querySelector(".block[x='" +x+ "'][y='"+y+"']")
        if (i.getAttribute("role") === "block") {
            i.setAttribute("role","mine")
            num = num + 1;
        }
        else {
            continue setter;
        }
    }
    let otherBlocks = roleBoard.querySelectorAll(".block[role='block']")
    for (let i of otherBlocks) {
        let x = i.getAttribute("x");x = Number(x);
        let y = i.getAttribute("y");y = Number(y);
        let block = roleBoard.querySelector(".block[x='" +x+ "'][y='"+y+"']");
        let numRole = 0;
        block.setAttribute("role",`${numRole}`)
        if ((x-1)<(boardLen+1) && (x-1)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y-1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x)<(boardLen+1) && (x)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x)+ "'][y='"+(y-1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x+1)<(boardLen+1) && (x+1)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y-1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x-1)<(boardLen+1) && (x-1)>0 && (y)>0 && (y)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x+1)<(boardLen+1) && (x+1)>0 && (y)>0 && (y)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x-1)<(boardLen+1) && (x-1)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y+1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x)<(boardLen+1) && (x)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x)+ "'][y='"+(y+1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
        if ((x+1)<(boardLen+1) && (x+1)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
            let object = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y+1)+"']");
            if (object.getAttribute("role") === "mine") {
                numRole = numRole + 1;
                block.setAttribute("role",`${numRole}`);
            }
        }
    }
}

function clickSet() {
    for (let object of Board.childNodes) {
        object.addEventListener("click", clicker);
    }
}

function clicker() {
    let e = event.target;
    if (e.getAttribute("role") === "block") {
        let x = e.getAttribute("x");x = Number(x);
        let y = e.getAttribute("y");y = Number(y);
        let roleBlock = roleBoard.querySelector(".block[x='" +x+ "'][y='"+y+"']");
        let role = roleBlock.getAttribute("role");
        if (role === "mine") {
            for(let i of roleBoard.querySelectorAll(".block[role='mine']")){
                let x = i.getAttribute("x");x = Number(x);
                let y = i.getAttribute("y");y = Number(y);
                let block = Board.querySelector(".block[x='" +x+ "'][y='"+y+"']");
                block.setAttribute("role","mine");
            }
            e.setAttribute("role", "lose");
            for (let object of Board.childNodes) {
                object.removeEventListener("click" , clicker, false);
            };
            console.log("you lose");
            resualtGame.textContent = "You Lose!!!"
            sizeSet = true;
            mineSet = true;
            MinesSet();
            SizeSet();
            clearTimeout(t);
        }
        else if (role === "0") {
            const trampolineZeroFinder = trampoline(ZeroFinder)
            function ZeroFinder(a,b) {
                let x = a;
                let y = b;
                let f = Board.querySelector(".block[x='" +(x)+ "'][y='"+(y)+"']");
                f.setAttribute("role","0");
                if ((x-1)<(boardLen+1) && (x-1)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y-1)+"']");
                    let object = Board.querySelector(".block[x='" +(x-1)+ "'][y='"+(y-1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x-1;
                            let d = y-1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x)<(boardLen+1) && (x)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x)+ "'][y='"+(y-1)+"']");
                    let object = Board.querySelector(".block[x='" +(x)+ "'][y='"+(y-1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x;
                            let d = y-1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x+1)<(boardLen+1) && (x+1)>0 && (y-1)>0 && (y-1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y-1)+"']");
                    let object = Board.querySelector(".block[x='" +(x+1)+ "'][y='"+(y-1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x+1;
                            let d = y-1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x-1)<(boardLen+1) && (x-1)>0 && (y)>0 && (y)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y)+"']");
                    let object = Board.querySelector(".block[x='" +(x-1)+ "'][y='"+(y)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x-1;
                            let d = y;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x+1)<(boardLen+1) && (x+1)>0 && (y)>0 && (y)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y)+"']");
                    let object = Board.querySelector(".block[x='" +(x+1)+ "'][y='"+(y)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x+1;
                            let d = y;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x-1)<(boardLen+1) && (x-1)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x-1)+ "'][y='"+(y+1)+"']");
                    let object = Board.querySelector(".block[x='" +(x-1)+ "'][y='"+(y+1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x-1;
                            let d = y+1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x)<(boardLen+1) && (x)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x)+ "'][y='"+(y+1)+"']");
                    let object = Board.querySelector(".block[x='" +(x)+ "'][y='"+(y+1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x;
                            let d = y+1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
                if ((x+1)<(boardLen+1) && (x+1)>0 && (y+1)>0 && (y+1)<(boardLen+1)) {
                    let objectRole = roleBoard.querySelector(".block[x='" +(x+1)+ "'][y='"+(y+1)+"']");
                    let object = Board.querySelector(".block[x='" +(x+1)+ "'][y='"+(y+1)+"']");
                    if (object.getAttribute("role") === "block") {
                        if (objectRole.getAttribute("role") === "0") {
                            let c = x+1;
                            let d = y+1;
                            trampolineZeroFinder(c,d)
                        }
                        else if (objectRole.getAttribute("role") === "mine") {
                            null
                        }
                        else {
                            let role = objectRole.getAttribute("role");
                            object.setAttribute("role",role);
                        }
                    }
                }
            }
            ZeroFinder(x,y);
        }
        else {
            e.setAttribute("role",role)
        }
    }
    checker();
    flagChecker();
    winChecker();
}

function checker() {
    for (let i of Board.querySelectorAll(".block")) {
        if (i.getAttribute("role") === "block") {
            null
        }
        else {
            i.removeAttribute("isFlagged");
        }
    }
}

function flagChecker() {
    let flagNum = 0;
    for (let z of Board.querySelectorAll(".block")) {
        if (z.getAttribute("isFlagged") === "flagged") {
            flagNum = flagNum + 1;
        }
    }
    flagBox.textContent = bomb - flagNum;
}

function winChecker() {
    let win = true;
    for (let i of Board.querySelectorAll(".block ")) {
        if (i.getAttribute("role") === "block") {
            let x = i.getAttribute("x");x = Number(x);
            let y = i.getAttribute("y");y = Number(y);
            let objectRole = roleBoard.querySelector(".block[x='" +(x)+ "'][y='"+(y)+"']");
            if (objectRole.getAttribute("role") === "mine") {
                null;
            }
            else {
                win = false;
            }
        }
    }
    if ( win === true) {
        console.log("you win!");
        resualtGame.innerHTML = "You Win!!!"
        for (let object of Board.childNodes) {
            object.removeEventListener("click" , clicker, false);
        };
        sizeSet = true;
        mineSet = true;
        MinesSet();
        SizeSet();
        clearTimeout(t);
    }
}

let mines20 = document.querySelector("#mines20");
let mines50 = document.querySelector("#mines50");
let mines100 = document.querySelector("#mines100");
let mines150 = document.querySelector("#mines150");
let mines200 = document.querySelector("#mines200");
let minesNum = document.querySelector(".minesNum");

function mines20func() {
    bomb = 20;
    minesNum.textContent = "20"
}
function mines50func() {
    bomb = 50;
    minesNum.textContent = "50"
}
function mines100func() {
    bomb = 100;
    minesNum.textContent = "100"
}
function mines150func() {
    bomb = 150;
    minesNum.textContent = "150"
}
function mines200func() {
    bomb = 200;
    minesNum.textContent = "200"
}

mines20.setAttribute("disabled",true);
mines50.setAttribute("disabled",true);
mines100.setAttribute("disabled",true);
mines150.setAttribute("disabled",true);
mines200.setAttribute("disabled",true);
let mineSet = true;

function MinesSet() {
    if (mineSet === true) {
        mines20.addEventListener("click",mines20func);
        mines50.addEventListener("click",mines50func);
        mines100.addEventListener("click",mines100func);
        mines150.addEventListener("click",mines150func);
        mines200.addEventListener("click",mines200func)
    }
    else if (mineSet === false) {
        mines20.removeEventListener("click", mines20func);
        mines50.removeEventListener("click",mines50func);
        mines100.removeEventListener("click",mines100func);
        mines150.removeEventListener("click",mines150func);
        mines200.removeEventListener("click",mines200func);
    }
}



let size5 = document.querySelector("#size5");
let size10 = document.querySelector("#size10");
let size20 = document.querySelector("#size20");
let size50 = document.querySelector("#size50");
let sizeNum = document.querySelector(".sizeNum");
let sizeSet = true;


function size10func() {
    boardLen = 10;
    roleBoard.style.width = "350px";
    Board.style.width = "350px";
    roleBoard.style.height = "350px";
    Board.style.height = "350px";
    sizerValue = false;
    mines20.removeAttribute("disabled");
    mines50.removeAttribute('disabled');
    mines100.setAttribute("disabled",true);
    mines150.setAttribute("disabled",true);
    mines200.setAttribute("disabled",true);
    sizeNum.textContent = "10x10";
};
function size20func() {
    boardLen = 20;
    roleBoard.style.width = "700px";
    Board.style.width = "700px";
    roleBoard.style.height = "700px";
    Board.style.height = "700px";
    sizerValue = false;
    mines20.removeAttribute("disabled");
    mines50.removeAttribute('disabled');
    mines100.removeAttribute("disabled");
    mines150.removeAttribute("disabled");
    mines200.removeAttribute("disabled");
    sizeNum.textContent = "20x20";
}
function size50func() {
    boardLen = 40;
    roleBoard.style.width = "800px";
    Board.style.width = "800px";
    roleBoard.style.height = "800px";
    Board.style.height = "800px";
    sizerValue = true;
    mines20.removeAttribute("disabled");
    mines50.removeAttribute('disabled');
    mines100.removeAttribute("disabled");
    mines150.removeAttribute("disabled");
    mines200.removeAttribute("disabled");
    sizeNum.textContent = "40x40";
}

function SizeSet() {
    if (mineSet === true) {
        size10.addEventListener("click",size10func);
        size20.addEventListener("click",size20func);
        size50.addEventListener("click",size50func)
    }
    else if (mineSet === false) {
        size10.removeEventListener("click",size10func);
        size20.removeEventListener("click",size20func);
        size50.removeEventListener("click",size50func);
    }
}


let sizerValue = false;
function sizer() {
    if (sizerValue === true) {
        for (let i of Board.querySelectorAll(".block")) {
            i.setAttribute("size","20")
        }
        for (let i of roleBoard.querySelectorAll(".block")) {
            i.setAttribute("size","20")
        }
    }
    else {
        for (let i of Board.querySelectorAll(".block")) {
            i.setAttribute("size","35")
        }
        for (let i of roleBoard.querySelectorAll(".block")) {
            i.setAttribute("size","35")
        }
    }
}




function removeBoards() {
    while (Board.firstChild) {
        Board.removeChild(Board.firstChild);
    }
    while (roleBoard.firstChild) {
        roleBoard.removeChild(roleBoard.firstChild);
    }
}

function GameManager() {
    sizeSet = false;
    mineSet = false;
    BoardCreater();
    GameBoardCreater();
    sizer();
    roleSetter();
    clickSet();
}

let startButton = document.querySelector("#start")
startButton.addEventListener("click",function() {
    removeBoards();
    GameManager();
    MinesSet();
    SizeSet();
    resetTimer();
    timer();
    resualtGame.innerHTML = "..."
});
MinesSet();
SizeSet();



//resualt
let resualtGame = document.querySelector(".resualtGame")



// timer
var h4 = document.getElementsByTagName('h4')[0];
var sec = 0;
var min = 0;
var hrs = 0;
var t;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
function add() {
    tick();
    h4.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

// start.onclick = timer;
// stop.onclick = function() {
//     clearTimeout(t);
// }
// reset.onclick = function() {
//     sec = 0; min = 0; hrs = 0;
//     h4.textContent = "";
// }

function resetTimer() {
    sec = 0; min = 0; hrs = 0;
    h4.innerHTML = "&nbsp";
}