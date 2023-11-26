function dataFetch() {
	fetch('/songs')
		.then(response => response.json())
		.then(data => {
			console.log(data);
            const tableBody = document.getElementById("list");
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }
			for(let i=0; i<data.length; i++){
				let tr = document.createElement("tr");
				
				let tdName = document.createElement("td");
				tdName.innerHTML = data[i].name;
				tr.appendChild(tdName);
				
				let tdPerformer = document.createElement("td");
				tdPerformer.innerHTML = data[i].performer;
				tr.appendChild(tdPerformer);
				
				let tdCategory = document.createElement("td");
				tdCategory.innerHTML = data[i].category;
				tr.appendChild(tdCategory);
				
				let tdDescription = document.createElement("td");
				tdDescription.innerHTML = data[i].description;
				tr.appendChild(tdDescription);
			
				
				let tdPrice = document.createElement("td");
				tdPrice.innerHTML = data[i].price;
				tr.appendChild(tdPrice);
					
				let td5 = document.createElement("td");

				let editLink = document.createElement("a");
				editLink.className = "btn btn-primary";
				editLink.href = "song.html?id=" + data[i].id;
				editLink.innerHTML = "Edit";

				td5.appendChild(editLink);
				tr.appendChild(td5);

				document.getElementById("list").appendChild(tr);
			}
		})
		.catch(error => {
			console.error('Error:', error);
	});	
}

function fetchDataPeriodically() {
    dataFetch();
    setInterval(dataFetch, 5000);
}

window.addEventListener("load", fetchDataPeriodically);
