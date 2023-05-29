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
						inP.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.checked = true;
					} catch (error) {
						console.error("Could not find a checkbox!");
					}

					const value = inP.value;
					const td = inP.parentElement.parentElement;

					inP.parentElement.remove();
					td.innerHTML = value;
				}

				// const isTrue = inP.parentElement.parentElement.parentElement.parentElement.classList.contains("printAble") || inP.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("printAble") || inP.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("printAble");
				else {
					const value = inP.value;
					const label = inP.parentElement.lastElementChild.innerHTML;
					const strong = document.createElement("strong");
					const span = document.createElement("span");
					const td = inP.parentElement.parentElement;

					td.classList.add("fontLarge");

					inP.parentElement.remove();
					strong.innerHTML = label.toUpperCase();
					span.innerHTML = ": " + value;
					td.append(strong);
					td.append(span);
				}

				pp.classList.remove("d-none");
				pp.classList.add("d-flex");
			}
		});
		pp.querySelectorAll("textarea").forEach(inP => {
			if (inP.value !== '') {
				const value = inP.value;
				const label = inP.parentElement.lastElementChild.innerHTML;
				const strong = document.createElement("strong");
				const span = document.createElement("span");
				const ta = inP.parentElement.parentElement;

				ta.classList.add("fontLarge");
				ta.classList.add("border-4");
				ta.classList.add("border-bottom");

				inP.parentElement.remove();
				strong.innerHTML = label.toUpperCase();
				span.innerHTML = ": " + value;
				ta.append(strong);
				ta.append(span);

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
	location.reload();
}