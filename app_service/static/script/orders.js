function createTableCell(value) {
    const td = document.createElement("td");
    td.innerHTML = value;
    return td;
}

function createEditLink(orderId) {
    const editLink = document.createElement("a");
    editLink.className = "btn btn-primary";
    editLink.href = `order.html?id=${orderId}`;
    editLink.innerHTML = "Details";
    return editLink;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function createTableRow(order, orderItems) {
    const tr = document.createElement("tr");
    tr.appendChild(createTableCell(formatDate(order.schedule_time)));
    tr.appendChild(createTableCell(order.status));
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.amount, 0);
    tr.appendChild(createTableCell(totalPrice));
    tr.appendChild(createTableCell(order.address));
    tr.appendChild(createTableCell(order.phone));

    const orderContent = orderItems.map(item => `${item.song.name} - ${item.song.performer} (x${item.amount})`).join(', ');
    tr.appendChild(createTableCell(orderContent));

    const detailsCell = document.createElement("td");
    detailsCell.appendChild(createEditLink(order.id));
    tr.appendChild(detailsCell);

    return tr;
}

function dataFetch() {
    let allOrderItems = [];

    fetch('http://localhost:8000/orderitem/')
        .then(response => response.json())
        .then(orderItems => {
            allOrderItems = orderItems;
            return fetch('http://localhost:8000/order/');
        })
        .then(response => response.json())
        .then(orders => {
            const tableBody = document.getElementById("list");
            tableBody.innerHTML = '';

            const promises = orders.map(order => {
                const orderItems = allOrderItems.filter(item => item.order_id === order.id);

                const songPromises = orderItems.map(item => {
                    return fetch(`http://localhost:8000/song/${item.song_id}`)
                        .then(response => response.json())
                        .then(song => ({...item, song}));
                });

                return Promise.all(songPromises)
                    .then(itemsWithSongs => ({order, items: itemsWithSongs}));
            });

            Promise.all(promises)
                .then(results => {
                    results.forEach(({order, items}) => {
                        const tr = createTableRow(order, items);
                        tableBody.appendChild(tr);
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener("load", dataFetch);
