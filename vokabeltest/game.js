// variables

let words = [
    ["Orange", "f", "orangen"],
    ["Birne", "f", "birnen"],
    ["Kuchen", "m", "kuchen"],
    ["Wasser", "d", "wasser"],
    ["Brot", "d", "brote"],
    ["Banane", "f", "bananen"],
    ["Butter", "f", "butter"],
    ["Ei", "d", "eier"],
    ["Mehl", "d", "mehl"],
    ["Milch", "f", "milch"],
    ["Zucker", "m", "zucher"],
    ["Pfannkuchen", "m", "pfannkuchen"],
    ["Schokolade", "f", "schokolade"],
    ["Hunger", "m", "hunger"],
    ["Euro", "m", "euro"],
    ["Kaffee", "m", "kaffees"],
    ["Brotchen", "d", "brotchen"],
    ["Wurstchen", "d", "wurstchen"],
    ["Tomate", "f", "tomaten"],
    ["Kartoffel", "f", "kartoffeln"],
    ["Zwiebel", "f", "zwiebeln"],
    ["Fisch", "m", "fische"],
    ["Kase", "m", "kase"],
    ["Salz", "d", "salz"],
    ["Tee", "m", "tees"],
    ["Obst", "d", "obst"],
    ["Gemuse", "d", "gemuse"],
    ["Mineralwasser", "d", "Mineralwasser"],
    ["Wasser", "d", "wasser"],
    ["Fleisch", "d", "fleisch"],
    ["Reis", "m", "reis"],
    ["Wein", "m", "weine"],
    ["Bier", "d", "biere"],
    ["Cent", "m", "cent"],
    ["Wurst", "f", "wurste"],
    ["Ol", "d", "ole"],
    ["Kilo", "d", "kilo"],
    ["Gramm", "d", "gramm"],
    ["Pfund", "d", "pfund"],
    ["Liter", "m", "liter"],
    ["Flasche", "f", "flaschen"],
    ["Dose", "f", "dosen"],
    ["Glas", "d", "glaser"]
]

let current_word;
let current_words = words;

let sel_gender;
let sel_plural;

let max_words = words.length;
let cur_words = 0;

let results = [];


// elements

let word_el = document.getElementById("word");
let der_el = document.getElementById("der");
let die_el = document.getElementById("die");
let das_el = document.getElementById("das");
let plural_el = document.getElementById("plural");
let go_el = document.getElementById("go");
let gendercheck_el = document.getElementById("gendercheck");
let pluralcheck_el = document.getElementById("pluralcheck");
let next_el = document.getElementById("next");
let progress_el = document.getElementById("progress");
let skip_el = document.getElementById("skip");

// functions

function rand_between(min, max){
    return (Math.floor(Math.random() * max) + min);
}

function new_word(){
    current_word = current_words[rand_between(0, current_words.length)];
    word_el.innerHTML = current_word[0];
}

function select_gender(gender){
    sel_gender = gender;

    der_el.classList.remove("der");
    die_el.classList.remove("die");
    das_el.classList.remove("das");

    switch (gender) {
        case "m":
            der_el.classList.add("der");
            break;

        case "f":
            die_el.classList.add("die");
            break;

        case "d":
            das_el.classList.add("das");
            break;
        
        default:
            break;
    }
}

function plural_change(){
    sel_plural = plural_el.value;
}

function gender_pronoun(gender){
    switch (gender) {
        case "m":
            return "der";

        case "f":
            return "die";

        case "d":
            return "das";
        
        default:
            break;
    }
}

function check(){

    if(!sel_plural) return;

    if (sel_gender == current_word[1]){
        gendercheck_el.classList.add("correct");
    } else {
        gendercheck_el.classList.add("incorrect");
        gendercheck_el.innerHTML = gender_pronoun(current_word[1]);
    }

    if (sel_plural.toLowerCase() == current_word[2]){
        pluralcheck_el.classList.add("correct");
    } else {
        pluralcheck_el.classList.add("incorrect");
        pluralcheck_el.innerHTML = current_word[2];
    }

    go_el.style.display = "none";
    next_el.parentElement.style.display = "flex";

    // log results

    let result = [current_word[0], gender_pronoun(current_word[1]), current_word[2], gender_pronoun(sel_gender), sel_plural];
    results.push(result);
}

function update_progress(){
    cur_words++;
    progress_el.innerHTML = cur_words + " / " + max_words;
}

function next_word(){
    gendercheck_el.classList.remove("correct");
    gendercheck_el.classList.remove("incorrect");
    pluralcheck_el.classList.remove("correct");
    pluralcheck_el.classList.remove("incorrect");
    gendercheck_el.innerHTML = "";
    pluralcheck_el.innerHTML = "";
    plural_el.value = "";

    der_el.classList.remove("der");
    die_el.classList.remove("die");
    das_el.classList.remove("das");

    go_el.style.display = "inline";
    next_el.parentElement.style.display = "none";

    if(cur_words == max_words - 1){
        next_el.innerHTML = "results";
        next_el.style.backgroundColor = "lightyellow";
    }

    if(cur_words == max_words){
        document.getElementsByClassName("mainbox")[0].classList.add("exit");
        setInterval(()=>end_test(), 600)
        return;
    }

    current_words.splice(current_words.indexOf(current_word), 1);

    update_progress();
    new_word();
}

function end_test(){
    localStorage.setItem("results", JSON.stringify(results));
    window.location.href = "results.html";
}

// main

der_el.addEventListener("click", () => select_gender("m"));
die_el.addEventListener("click", () => select_gender("f"));
das_el.addEventListener("click", () => select_gender("d"));

plural_el.value = "";
plural_el.addEventListener("change", () => plural_change());

go_el.addEventListener("click", () => check());
next_el.addEventListener("click", () => next_word());
skip_el.addEventListener("click", () => end_test());

update_progress();
new_word();