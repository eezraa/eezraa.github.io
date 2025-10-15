let results = JSON.parse(localStorage.getItem("results"));

let results_el = document.getElementById("results");
let word_el = document.getElementById("word");
let again_el = document.getElementById("again");

let max_points = results.length * 2;
let current_points = 0;

results.forEach((el) => {
    let entry_el = document.createElement("div");

    entry_el.innerHTML += '<span class="entry">'+el[0]+" - </span> ";

    if (el[1] == el[3]){
        entry_el.innerHTML += '<span class="correct">'+el[3]+"</span> ";
        current_points++;
    }else{
        entry_el.innerHTML += '<span class="wrong">'+el[3]+"</span> "+el[1] +" ";
    }

    if (el[2] == el[4]){
        entry_el.innerHTML += '<span class="correct">'+el[4]+"</span> ";
        current_points++;
    }else{
        entry_el.innerHTML += '<span class="wrong">'+el[4]+"</span> "+el[2] +" ";
    }

    results_el.appendChild(entry_el);
})

word_el.innerHTML = Math.floor((current_points/max_points) * 100) + "% (" + current_points + "/" + max_points + ")";

again_el.addEventListener("click", () => {
    window.location.href = "home.html";
})