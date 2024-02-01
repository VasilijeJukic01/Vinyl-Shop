let id = null;
let featuresData = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

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

	const songFetch = fetch(`http://localhost:8000/song/${id}`, {
		headers: { 'Authorization': `Bearer ${token}` }
		})
		.then(resp => resp.json());
	const categoriesFetch = fetch("http://localhost:8000/category", {
		headers: { 'Authorization': `Bearer ${token}` }
	})
		.then(resp => resp.json());
	const featuresFetch = fetch(`http://localhost:8000/songfeature/song/${id}`, {
		headers: { 'Authorization': `Bearer ${token}` }
	})
		.then(resp => resp.json())
		.then(data => {
			featuresData = data;
		});

	Promise.all([songFetch, categoriesFetch, featuresFetch])
		.then(([songData, categoriesData]) => {
			if (songData) {
				const { name, performer, description, category_id, price } = songData;
				document.getElementById("name").value = name;
				document.getElementById("performer").value = performer;
				document.getElementById("description").value = description;
				document.getElementById("price").value = price;

				categoriesData.forEach(category => {
					const option = createHTMLElement("option", [], { value: category.id }, category.name);
					document.getElementById("category").appendChild(option);
				});
				document.getElementById("category").value = category_id;
			}
		})
		.catch(err => console.log(err));

	document.getElementById("form").addEventListener("submit", function(event){
		event.preventDefault();
		if(!validation()) {
			alert("Validation error! Please check fields.");
			return;
		}

		const newSong = {
			name: document.getElementById("name").value,
			performer: document.getElementById("performer").value,
			description: document.getElementById("description").value,
			category_id: document.getElementById("category").value,
			price: document.getElementById("price").value
		};

		fetch("http://localhost:8000/song/", {
			method: "POST",
			headers: { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}` },
			body: JSON.stringify(newSong)
		})
			.then(succ => succ.json())
			.then(() => {
				window.location.href='/songs.html';
			})
			.catch(err => console.log(err));
	});

	const saveButton = document.getElementById("save");
	if (saveButton) {
		saveButton.addEventListener("click", function(event){
			event.preventDefault();
			if(!validation()){
				alert("Validation error! Please check fields.");
				return;
			}

			const newSong = {
				name: document.getElementById("name").value,
				performer: document.getElementById("performer").value,
				description: document.getElementById("description").value,
				category_id: document.getElementById("category").value,
				features: Array.from(document.querySelectorAll("#features > span")).map(span => span.dataset.id),
				price: document.getElementById("price").value
			};

			fetch(`http://localhost:8000/song/${id}`, {
				method : "PUT",
				headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
				body: JSON.stringify(newSong)
			})
				.then(succ=> succ.json())
				.then(() => {
					const features = Array.from(document.querySelectorAll("#features > span")).map(span => span.dataset.id);
					features.forEach(feature => {
						const newSongFeature = {
							song_id: id,
							feature_id: feature
						};

						fetch("http://localhost:8000/songfeature/", {
							method: "POST",
							headers: { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}` },
							body: JSON.stringify(newSongFeature)
						})
							.then(succ => succ.json())
							.catch(err => console.log(err));
					});

					//window.location.href='administrator/songs.html';
				})
				.catch(err => console.log(err));
		});
	}

	const deleteButton = document.getElementById("delete");
	if (deleteButton) {
		deleteButton.addEventListener("click", function() {
			if(confirm("Are you sure?")){
				fetch(`http://localhost:8000/song/${id}`, {
					headers : { 'Authorization': `Bearer ${token}` },
					method : "DELETE"
				})
					.then(resp => resp.json())
					.then(data => {
						alert("Deleted song with id "+data);
						window.location.href='/songs.html';
					})
					.catch(err => console.log(err));
			}
		});
	}

	document.getElementById("name").addEventListener("keypress", function(){
		this.classList.remove('success', 'error');
	});

	const addFeatureButton = document.getElementById("add-feature");
	if (addFeatureButton) {
		document.getElementById("add-feature").addEventListener("click", function(){
			let id = document.getElementById("feature-list").value;
			if(!id){
				alert("Chose feature");
				return;
			}
			addFeature(id);
		});
	}

	const selector = document.getElementById("category");
	if (selector) {
		fetch("http://localhost:8000/category", {
				headers: {
					'Authorization': `Bearer ${token}`
				}
		})
			.then(resp => resp.json())
			.then(data => {
				data.forEach(category => {
					const option = createHTMLElement("option", [], { value: category.id }, category.name);
					selector.appendChild(option);
				});
			})
			.catch(err => console.log(err));
	}

	const featureSelector = document.getElementById("feature-list");
	if (featureSelector) {
		fetch("http://localhost:8000/feature", {
				headers: { 'Authorization': `Bearer ${token}` }
		})
			.then(resp => resp.json())
			.then(data => {
				data.forEach(feature => {
					const option = createHTMLElement("option", [], { value: feature.id }, feature.name);
					featureSelector.appendChild(option);
				});
				if (featuresData) featuresData.forEach(feature => addFeature(feature.feature_id));
			})
			.catch(err => console.log(err));
	}

});
