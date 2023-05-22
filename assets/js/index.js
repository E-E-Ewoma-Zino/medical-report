// This script is for printing of the website page

const printable = document.querySelectorAll(".printAble");
const urinalysis = document.getElementById("urinalysis");
const microbiology = document.getElementById("microbiology");
const fullBloodCount = document.getElementById("fullBloodCount");
const cfsMirocoscopy = document.getElementById("cfsMirocoscopy");
const serminalAlalysis = document.getElementById("serminalAlalysis");
const chemicalPathology = document.getElementById("chemicalPathology");

function notShow() {
    printable.forEach(p => {
        p.classList.remove("d-flex");
        p.classList.add("d-none");
    });
}

function show() {
    printable.forEach(p => {
        p.classList.remove("d-none");
        p.classList.add("d-flex");
    });
}

const printBtn = document.getElementById("printBtn");

printBtn.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelectorAll(".mui-textfield>label").forEach(tf => tf.style.display = "none");
    document.querySelectorAll("td>.mui-textfield>input").forEach(tf => tf.style.border = "none");

    notShow();

    printable.forEach(pp => {
        pp.querySelectorAll("input").forEach(inP => {
            if (inP.type === "checkbox") {
                if (inP.checked) {
                    pp.classList.remove("d-none");
                    pp.classList.add("d-flex");
                }
                return;
            }
            if (inP.value !== '') {
                pp.classList.remove("d-none");
                pp.classList.add("d-flex");
            }
        });
    });

    window.print();
});

window.onafterprint = function () {    
    document.querySelectorAll(".mui-textfield>label").forEach(tf => tf.style.display = "block");
    document.querySelectorAll("td>.mui-textfield>input").forEach(tf => tf.style.border = "block");
    show();
}