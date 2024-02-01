let id = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

window.addEventListener("load", function(){
    let url = new URL(window.location.href);
    id = url.searchParams.get("id");

    fetch(`http://localhost:8000/order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(order => {
            document.querySelector(".row dt:nth-child(1) + dd").textContent = formatDate(order.schedule_time);
            document.querySelector(".row dt:nth-child(3) + dd").textContent = order.address;
            document.querySelector("#status").value = order.status;

            return fetch(`http://localhost:8000/orderitem/?order_id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .then(response => response.json())
        .then(orderItems => {
            console.log('All order items:', orderItems);
            const filteredOrderItems = orderItems.filter(item => item.order_id === Number(id));
            console.log('Filtered order items:', filteredOrderItems);
            const songPromises = filteredOrderItems
                .map(item => {
                    return fetch(`http://localhost:8000/song/${item.song_id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(song => ({...item, song}));
                });

            return Promise.all(songPromises);
        })
        .then(itemsWithSongs => {
            document.querySelector("#content").innerHTML = itemsWithSongs.map(item => {
                if (item.song) {
                    return `- ${item.song.name} - ${item.song.performer} (x${item.amount})`;
                }
                else return '';
            }).join('<br>');
            document.querySelector(".row dt:nth-child(7) + dd").textContent =
                itemsWithSongs.reduce((total, item) => total + item.price * item.amount, 0);
        })
        .catch(error => console.error('Error:', error));
});

function updateStatus() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    const status = document.getElementById('status').value;
    fetch(`http://localhost:8000/order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}