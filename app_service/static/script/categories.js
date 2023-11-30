function createTableCell(value) {
    const td = document.createElement("td");
    td.innerHTML = value;
    return td;
}

function createEditLink(categoryId) {
    const editLink = document.createElement("a");
    editLink.className = "btn btn-primary";
    editLink.href = `category.html?id=${categoryId}`;
    editLink.innerHTML = "Edit";
    return editLink;
}

function createTableRow(category) {
    const tr = document.createElement("tr");

    tr.appendChild(createTableCell(category.name));

    const editCell = document.createElement("td");
    editCell.appendChild(createEditLink(category.id));
    tr.appendChild(editCell);

    return tr;
}

function dataFetch() {
    fetch('http://localhost:8000/category/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tableBody = document.getElementById("list");
            tableBody.innerHTML = '';

            data.forEach(category => {
                const tr = createTableRow(category);
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener("load", dataFetch);
