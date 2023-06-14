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
	e.currentTarget.innerHTML = "Print";
	e.currentTarget.classList.add("mui-btn--danger");
	e.currentTarget.classList.remove("mui-btn--primary");

	notShow();

	printable.forEach(pp => {
		pp.querySelectorAll("td>.mui-textfield>label").forEach(tf => tf.style.display = "none");
		pp.querySelectorAll("td>.mui-textfield>input").forEach(tf => tf.style.border = "none");

		pp.querySelectorAll("input").forEach(inP => {
			if (inP.type === "checkbox") {
				if (inP.checked) {
					pp.classList.remove("d-none");
					pp.classList.add("d-flex");
				}
				return;
			}
			if (inP.value !== '') {
				if (inP.parentElement.parentElement.tagName === "TD") {
					try {
						// Try to check the checkbox for this input field
						inP.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.checked = true;
					} catch (error) {
						console.error("Could not find a checkbox!");
					}

					const value = inP.value;
					const td = inP.parentElement.parentElement;

					inP.parentElement.remove();
					td.innerHTML = value;
				} else {
					formatInput(inP);
				}
				activate(pp, inP);
			}
		});
		pp.querySelectorAll("textarea").forEach(inP => {
			if (inP.value !== '') {
				formatInput(inP);
				activate(pp, inP);
			}
		});
	});

	twin();

	formatPersonalSection();

	doThis();

	microbiologyOnFinish();

	document.querySelector(".regBox").classList.add("d-flex");
	document.querySelector(".regBox").classList.add("p-2");

	e.currentTarget.addEventListener("click", () => window.print());
});

window.onafterprint = function () {
	document.querySelectorAll(".mui-textfield>label").forEach(tf => tf.style.display = "block");
	document.querySelectorAll("td>.mui-textfield>input").forEach(tf => tf.style.border = "block");

	show();
	location.reload();
}

function twin() {
	// some condictions
	// make it so that once any of these sections are selected, the twin section is also selected
	if (printable[0].classList.contains("d-flex") || printable[1].classList.contains("d-flex")) {
		printable[0].classList.remove("d-none");
		printable[0].classList.add("d-flex");
		printable[1].classList.remove("d-none");
		printable[1].classList.add("d-flex");
	}
	if (printable[5].classList.contains("d-flex") || printable[6].classList.contains("d-flex")) {
		printable[5].classList.remove("d-none");
		printable[5].classList.add("d-flex");
		printable[6].classList.remove("d-none");
		printable[6].classList.add("d-flex");
	}
}

function activate(pp, inP) {
	// check the checkbox for each selected section
	pp.querySelector("input").type === "checkbox" ? pp.querySelector("input").checked = true : "do nothing";
	pp.classList.remove("d-none");
	pp.classList.add("d-flex");
}

function formatInput(inP) {
	const value = inP.value;
	console.log("inP", inP);
	const label = inP.parentElement.querySelector("label").innerHTML;
	const strong = document.createElement("strong");
	const span = document.createElement("strong");
	const ta = inP.parentElement.parentElement;

	ta.classList.add("fontLarge");
	ta.classList.add("border-4");
	ta.classList.add("border-bottom");

	inP.parentElement.remove();
	strong.innerHTML = label.toUpperCase();
	span.innerHTML = ": " + value;
	ta.append(strong);
	ta.append(span);
}

// format the person input section
function formatPersonalSection() {
	document.querySelector("#personal").querySelectorAll("input").forEach(inP => {
		formatInput(inP);
	});
	document.querySelector("#personal").querySelectorAll("select").forEach(inP => {
		formatInput(inP);
	});
}

// MOre stuff
function doThis() {
	const d = document.querySelectorAll("div[class*='p-col']");

	d.forEach(function (o) {
		let newC = '';
		o.classList.value.split(" ").forEach(function (l) {
			if (l.search("p-") === 0) newC = l;
			o.classList.remove(l);
		});
		o.classList.add(newC.substring(2, newC.length));
		o.classList.add("fontLarge");
	});
}

function microbiologyOnFinish () {
	const microbiology = document.querySelector(".microbiologyOnFinish");
	const choosenOnes = [];

	Array.from(microbiology.children).forEach(col => {
		console.log("What is col", col);
		[...col.children].forEach(muicheckBox => {
			const checkbox = muicheckBox.firstElementChild.firstElementChild;
			if(checkbox.checked) choosenOnes.push(muicheckBox);
		});
	});

	microbiology.innerHTML = null;
	choosenOnes.forEach(theOne => {
		theOne.classList.add("col");
		theOne.classList.add("mt-2");
		microbiology.append(theOne);
	});
}