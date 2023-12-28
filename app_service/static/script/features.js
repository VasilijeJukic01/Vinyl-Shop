const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function createTableCell(value) {
    const td = document.createElement("td");
    td.innerHTML = value;
    return td;
}

function createEditLink(featureId) {
    const editLink = document.createElement("a");
    editLink.className = "btn btn-primary";
    editLink.href = `feature.html?id=${featureId}`;
    editLink.innerHTML = "Edit";
    return editLink;
}

function createTableRow(feature) {
    const tr = document.createElement("tr");
    tr.appendChild(createTableCell(feature.name));

    const editCell = document.createElement("td");
    editCell.appendChild(createEditLink(feature.id));
    tr.appendChild(editCell);

    return tr;
}

function dataFetch() {
    fetch('http://localhost:8000/feature/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tableBody = document.getElementById("list");
            tableBody.innerHTML = '';

            data.forEach(feature => {
                const tr = createTableRow(feature);
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener("load", dataFetch);
