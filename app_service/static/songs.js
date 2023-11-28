function dataFetch() {
	fetch('http://localhost:8000/song/')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			const tableBody = document.getElementById("list");
			while (tableBody.firstChild) {
				tableBody.removeChild(tableBody.firstChild);
			}

			const promises = data.map(song => {
					return fetch(`http://localhost:8000/category/${song.category_id}`)
						.then(response => response.json())
						.then(category => ({song, category}));
				}
			);

			Promise.all(promises)
				.then(results => {
					results.forEach(({ song, category }) => {
						let tr = document.createElement("tr");

						let tdName = document.createElement("td");
						tdName.innerHTML = song.name;
						tr.appendChild(tdName);

						let tdPerformer = document.createElement("td");
						tdPerformer.innerHTML = song.performer;
						tr.appendChild(tdPerformer);

						let tdCategory = document.createElement("td");
						tdCategory.innerHTML = category.name;
						tr.appendChild(tdCategory);

						let tdDescription = document.createElement("td");
						tdDescription.innerHTML = song.description;
						tr.appendChild(tdDescription);

						let tdPrice = document.createElement("td");
						tdPrice.innerHTML = song.price;
						tr.appendChild(tdPrice);

						let td5 = document.createElement("td");

						let editLink = document.createElement("a");
						editLink.className = "btn btn-primary";
						editLink.href = "song.html?id=" + song.id;
						editLink.innerHTML = "Edit";

						td5.appendChild(editLink);
						tr.appendChild(td5);

						tableBody.appendChild(tr);
					});
				});
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

/*
function fetchDataPeriodically() {
    dataFetch();
    setInterval(dataFetch, 5000);
}
*/

window.addEventListener("load", dataFetch);