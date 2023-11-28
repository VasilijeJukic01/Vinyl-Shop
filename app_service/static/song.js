
let id = null;

function validation() {
	let valid = true;
	if (document.getElementById("name").value.length < 3) {
		valid = false;
		document.getElementById("name").classList.add("error");
		document.getElementById("name").classList.remove("success");
	}
	else {
		document.getElementById("name").classList.add("success");
		document.getElementById("name").classList.remove("error");
	}
	return valid;
}

window.addEventListener("load", function(){

	let url = new URL(window.location.href);
	id = url.searchParams.get("id");
	fetch("http://localhost:8000/song/"+id)
		.then(resp => resp.json())
		.then(data => {
				document.getElementById("name").value = data.name;
				document.getElementById("performer").value = data.performer;
				document.getElementById("description").value = data.description;
				document.getElementById("category").value = data.category_id;
				document.getElementById("price").value = data.price;
				for(let i = 0; i < data.features.length; i++){
					addFeature(data.features[i]);
				}
				console.log(data);
			}
		)
		.catch(err => console.log(err));

	document.getElementById("form").addEventListener("submit", function(event){
		event.preventDefault();
		let valid = validation();
		if(!valid) return;

		let newSong = {};
		newSong.name = document.getElementById("name").value;
		newSong.performer = document.getElementById("performer").value;
		newSong.description = document.getElementById("description").value;
		newSong.category_id = document.getElementById("category").value;
		newSong.price = document.getElementById("price").value;

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
		this.classList.remove('success'); 
		this.classList.remove('error'); 
	});
	
	document.getElementById("add-feature").addEventListener("click", function(){
        let id = document.getElementById("feature-list").value;
        if(!id){
            alert("Chose feature");
            return;
        }
        addFeature(id);
    });
	
	function addFeature(id){
		document.querySelector(`#feature-list > option[value='${id}']`).disabled = true;
		document.getElementById("feature-list").selectedIndex = 0;
		
		let name = document.querySelector(`#feature-list > option[value='${id}']`).innerHTML;
		
		let span = document.createElement("span");
		span.classList.add("badge");
		span.classList.add("bg-secondary");
		span.dataset.id = id;
		span.innerHTML = name;
		
		let button = document.createElement("button");
		button.type="button";
		button.classList.add("btn");
		button.classList.add("btn-default");
		button.classList.add("btn-sm");
		button.innerHTML = "X";

		span.appendChild(button);
		document.getElementById("features").appendChild(span);
		
		document.getElementById("features").appendChild(document.createTextNode(" "));

		button.addEventListener("click", function(){
			let id = this.parentNode.dataset.id;
			this.parentNode.parentNode.removeChild(this.parentNode);
			document.querySelector(`#feature-list > option[value='${id}']`).disabled = false;
		});
	}
	
});


