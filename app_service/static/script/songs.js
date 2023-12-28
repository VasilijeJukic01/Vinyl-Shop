const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchSongCategory(categoryId) {

	return fetch(`http://localhost:8000/category/${categoryId}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
		.then(response => response.json());
}

function createTableCell(value) {
	const td = document.createElement("td");
	td.innerHTML = value;
	return td;
}

function createEditLink(songId) {
	const editLink = document.createElement("a");
	editLink.className = "btn btn-primary";
	editLink.href = `song.html?id=${songId}`;
	editLink.innerHTML = "Edit";
	return editLink;
}

function createTableRow(song, category) {
	const tr = document.createElement("tr");

	tr.appendChild(createTableCell(song.name));
	tr.appendChild(createTableCell(song.performer));
	tr.appendChild(createTableCell(category.name));
	tr.appendChild(createTableCell(song.description));
	tr.appendChild(createTableCell(song.price));

	const editCell = document.createElement("td");
	editCell.appendChild(createEditLink(song.id));
	tr.appendChild(editCell);

	return tr;
}

function dataFetch() {
	fetch('http://localhost:8000/song/',{
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			const tableBody = document.getElementById("list");
			tableBody.innerHTML = '';

			const promises = data.map(song => {
				return fetchSongCategory(song.category_id)
					.then(category => ({ song, category }));
			});

			Promise.all(promises)
				.then(results => {
					results.forEach(({ song, category }) => {
						const tr = createTableRow(song, category);
						tableBody.appendChild(tr);
					});
				});
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

window.addEventListener("load", dataFetch);
