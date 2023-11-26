window.addEventListener("load", function(){
	document.getElementById("form").addEventListener("submit", function(){
		let valid = true
		if (document.getElementById("name").value.length < 3) {
			valid = false
			
			event.preventDefault();
			
			document.getElementById("name").classList.add("error");
			document.getElementById("name").classList.remove("success");
		}
		else {
			document.getElementById("name").classList.add("success");
			document.getElementById("name").classList.remove("error");
			
			let spans = document.querySelectorAll("#features > span.badge");
			let niz = [];
			for(let i = 0; i < spans.length; i++){
			   niz.push(spans[i].dataset.id);
			}
			
			document.getElementById("features-input").value = JSON.stringify(niz);
		}
		return valid
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


