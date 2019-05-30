const redF = {
    name: "Red Flower",
    image: "./pics/victoria-tronina-685353-unsplash.jpg"
};
const blueF = {
    name: "Blue Flower",
    image: "./pics/t-l-298209-unsplash.jpg"
};
const yellowF = {
    name: "Yellow Flower",
    image: "./pics/mohammed-amin-634693-unsplash.jpg"
};
const whiteF = {
    name: "White Flower",
    image: "./pics/twinewood-studio-1564813-unsplash.jpg"
};
const pinkF = {
    name: "Pink Flower",
    image: "./pics/eniko-kis-688765-unsplash.jpg"
};
const orangeF = {
    name: "Orange Flower",
    image: "./pics/dell-rg-760393-unsplash.jpg"
};
const purpleF = {
    name: "Purple Flower",
    image: "./pics/arunas-naujokas-349833-unsplash.jpg"
};
const lightblueF = {
    name: "Light Blue Flower",
    image: "./pics/justin-chavanelle-641833-unsplash.jpg"
};
const paleyellowF = {
    name: "Pale Yellow Flower",
    image: "./pics/aaron-burden-112024-unsplash.jpg"
};
const grayF = {
    name: "Gray Flower",
    image: "./pics/ian-dooley-281901-unsplash.jpg"
};
const blackF = {
    name: "Black Flower",
    image: "./pics/annie-spratt-218459-unsplash.jpg"
};

var playerFlowers = [];
var currentDay = 1;

function hide(){
    var goBox = document.getElementById("go");
    goBox.style.display="none";
}

function getRand(x){
    var rand = Math.floor(Math.random() * x);
    return rand;
}

function getGene(x){
    if (x<=30){
        return 'R';
    } else if (x<=55){
        return 'B';
    } else if (x<=80){
        return 'Y';
    } else if (x<=95){
        return 'W';
    } else {
        return 'b';
    }
}

function assignGenes(flower){
    var rand = getRand(100);
    flower.gene1 = getGene(rand);
    rand = getRand(100);
    flower.gene2 = getGene(rand);
}

function determineColor(flower){
    if (flower.gene1==='b' && flower.gene2==='b'){
        return blackF;
    }
    if (flower.gene1==='W'){
        if (flower.gene2==='R'){
            return pinkF;
        } else if (flower.gene2==='B'){
            return lightblueF;
        } else if (flower.gene2==='Y'){
            return paleyellowF;
        } else if (flower.gene2==='b'){
            return grayF;
        } else {
            return whiteF;
        }
    } else if (flower.gene2==='W'){
        if (flower.gene1==='R'){
            return pinkF;
        } else if (flower.gene1==='B'){
            return lightblueF;
        } else if (flower.gene1==='Y'){
            return paleyellowF;
        } else if (flower.gene1==='b'){
            return grayF;
        } else {
            return whiteF;
        }
    }
    if (flower.gene1==='R'){
        if (flower.gene2==='B'){
            return purpleF;
        } else if (flower.gene2==='Y'){
            return orangeF;
        } else {
            return redF;
        }
    } else if (flower.gene2==='R'){
        if (flower.gene1==='B'){
            return purpleF;
        } else if (flower.gene1==='Y'){
            return orangeF;
        } else {
            return redF;
        }
    }
    if (flower.gene1==='B'){
        return blueF;
    }
    if (flower.gene2==='B'){
        return blueF;
    }
    return yellowF;
}

function displayFlowers(){
    var flowerBox = document.getElementById("flowerBox");
    flowerBox.innerHTML="";
    for (var b=0;b<playerFlowers.length;b++){
        if (playerFlowers[b].lifespan<currentDay){
            var newArr = playerFlowers.slice(b+1,playerFlowers.length);
            playerFlowers = newArr;
            b--;
        } else {
            var newF = document.createElement("div");
            newF.classList.add("flowerdisplayname");
            var imgF = new Image(3000,1500);
            imgF.src = playerFlowers[b].image;
            newF.innerHTML = playerFlowers[b].name + "<br>";
            if (playerFlowers[b].name==="Black Flower"){
                alert("You've won!");
            }
            newF.appendChild(imgF);
            flowerBox.appendChild(newF);
        }
    }
    console.log(playerFlowers);
    //uncomment this to cheat
}

function plant(x){
    for (var a=0;a<x;a++){
        var newFlower ={};
        assignGenes(newFlower);
        var flowerObj = determineColor(newFlower);
        newFlower.name = flowerObj.name;
        newFlower.image = flowerObj.image;
        newFlower.lifespan = (getRand(5) + 1) + currentDay;
        playerFlowers.push(newFlower);
        displayFlowers();
    }
    var numberbox = document.getElementsByClassName("numberselectbox");
    for (var c=0;c<numberbox.length;c++){
        numberbox[c].style.display="none";
    }
    var goBox = document.getElementById("go");
    goBox.style.display="inline-block";
    //goBox.onlick=bees;
    var boxTop = document.getElementsByClassName("gameboxtop");
    boxTop.innerHTML = "Day " + currentDay;
}

function breedFlowers(x){
    for (var a=0;a<x;a++){
        var ranF1 = getRand(playerFlowers.length);
        var ranF2 = getRand(playerFlowers.length);
        while (ranF1===ranF2){
            ranF2 = getRand(playerFlowers.length);
        }
        var newF = {}
        var randG1 = getRand(1);
        var randG2 = getRand(1);
        if (randG1===1){
            newF.gene1 = playerFlowers[ranF1].gene1;
        } else {
            newF.gene1 = playerFlowers[ranF1].gene2;
        }
        if (randG2===1){
            newF.gene2 = playerFlowers[ranF2].gene2;
        } else {
            newF.gene2 = playerFlowers[ranF2].gene1;
        }
        var color = determineColor(newF);
        newF.name = color.name;
        newF.image = color.image;
        newF.lifespan = getRand(5) + 2 + currentDay;
        playerFlowers.push(newF);
    }
    displayFlowers();
}

function pruneNumber(){
    if (Math.floor(playerFlowers.length/3)>2){
        return Math.floor(playerFlowers.length/3);
    } else {
        return 2;
    }
}

function addOnClick(flower,z,left){
    //console.log ("adding click to flower #" + z);
    flower.onclick=function(){
        prune(z,left);
    }
}

function bees(){
    currentDay++;
    var bee = getRand(5) +1;
    //console.log(bee + " bees");
    breedFlowers(bee);
    var boxTop = document.getElementById("topbox");
    boxTop.innerHTML = "Day " + currentDay;
    var textbox = document.getElementById("textbox");
    textbox.innerHTML = "";
    textbox.innerHTML = "You had " + bee + " bees visit your greenhouse.<br><br>Each bee fertilized a flower which created a new seed using the genes of two of your existing flowers!";
    if (getRand(2)===1){
        plant(1);
        textbox.innerHTML += "<br><br>A seed flew into the greenhouse. A random flower has been planeted.";
    }
    textbox.innerHTML += "<br>You may now prune some flowers from your garden. You may prune " + pruneNumber() + " today.";
    var flowerboxes = document.getElementsByClassName("flowerdisplayname");
    for (var z=0;z<flowerboxes.length;z++){
        var left = pruneNumber();
        addOnClick(flowerboxes[z],z,left);
        //thisbox.display.cursor= "crosshair";
    }
}
function prune(x,num){
    //console.log("pruning #" + x + " :" + playerFlowers[x].name);
    playerFlowers.splice(x,1);
    displayFlowers();
    if (num>1){
        var flowerboxes = document.getElementsByClassName("flowerdisplayname");
        for (var y=0;y<flowerboxes.length;y++){
            addOnClick(flowerboxes[y],y,num-1);
        } 
    } else {
        var flowerboxes = document.getElementsByClassName("flowerdisplayname");
        for (var w=0;w<flowerboxes.length;w++){
            flowerboxes[w].onclick=function() {};
        }
    }
}