
let id = null;

function validation() {
	const nameInput = document.getElementById("name");
	const nameValue = nameInput.value;

	if (nameValue.length < 3) {
		nameInput.classList.add("error");
		nameInput.classList.remove("success");
		return false;
	}
	else {
		nameInput.classList.add("success");
		nameInput.classList.remove("error");
		return true;
	}
}

function addFeature(id) {
	const featureList = document.getElementById("feature-list");
	const selectedOption = featureList.querySelector(`option[value='${id}']`);
	selectedOption.disabled = true;
	featureList.selectedIndex = 0;

	const name = selectedOption.innerHTML;

	const span = createHTMLElement("span", ["badge", "bg-secondary"], { "data-id": id }, name);
	const button = createHTMLElement("button", ["btn", "btn-default", "btn-sm"], {}, "X");

	span.appendChild(button);
	document.getElementById("features").appendChild(span);
	document.getElementById("features").appendChild(document.createTextNode(" "));

	button.addEventListener("click", function () {
		const featureId = this.parentNode.dataset.id;
		this.parentNode.parentNode.removeChild(this.parentNode);
		document.querySelector(`#feature-list > option[value='${featureId}']`).disabled = false;
	});
}

function createHTMLElement(tag, classes, attributes, innerHTML) {
	const element = document.createElement(tag);
	classes.forEach(className => element.classList.add(className));
	Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
	element.innerHTML = innerHTML;
	return element;
}

window.addEventListener("load", function(){
	let url = new URL(window.location.href);
	id = url.searchParams.get("id");

	fetch(`http://localhost:8000/song/${id}`)
		.then(resp => resp.json())
		.then(data => {
			const { name, performer, description, category_id, price, features } = data;
			document.getElementById("name").value = name;
			document.getElementById("performer").value = performer;
			document.getElementById("description").value = description;
			document.getElementById("category").value = category_id;
			document.getElementById("price").value = price;

			features.forEach(addFeature);
			console.log(data);
		})
		.catch(err => console.log(err));

	document.getElementById("form").addEventListener("submit", function(event){
		event.preventDefault();
		if(!validation()) return;

		const newSong = {
			name: document.getElementById("name").value,
			performer: document.getElementById("performer").value,
			description: document.getElementById("description").value,
			category_id: document.getElementById("category").value,
			price: document.getElementById("price").value
		};

		fetch("http://localhost:8000/song/", {
			method:"POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong)
		})
			.then(succ => succ.json())
			.then(() => {
				window.location.href='/songs.html';
			})
			.catch(err => console.log(err));
	});

	document.getElementById("name").addEventListener("keypress", function(){
		this.classList.remove('success', 'error');
	});
	
	document.getElementById("add-feature").addEventListener("click", function(){
        let id = document.getElementById("feature-list").value;
        if(!id){
            alert("Chose feature");
            return;
        }
        addFeature(id);
    });
	
});
