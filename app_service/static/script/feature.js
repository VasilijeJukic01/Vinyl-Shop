let id = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function validation() {
    const nameInput = document.getElementById("name");
    const nameValue = nameInput.value;

    if (nameValue.length < 1) {
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

window.addEventListener("load", function(){
    let url = new URL(window.location.href);
    id = url.searchParams.get("id");

    fetch(`http://localhost:8000/feature/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .then(data => {
            if (data) {
                const { name } = data;
                document.getElementById("name").value = name;
            }
        })
        .catch(err => console.log(err));

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();
        if(!validation()) {
            alert("Validation error! Please check fields.");
            return;
        }

        const newFeature = {
            name: document.getElementById("name").value,
        };

        fetch("http://localhost:8000/feature/", {
            method : "POST",
            headers: { 'Content-Type' : 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(newFeature)
        })
            .then(succ => succ.json())
            .then(() => {
                window.location.href='/features.html';
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

            const newFeature = {
                name: document.getElementById("name").value,
            };

            fetch(`http://localhost:8000/feature/${id}`, {
                method : "PUT",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newFeature)
            })
                .then(succ=>succ.json())
                .then(() => {
                    window.location.href='/features.html';
                })
                .catch(err => console.log(err));
        });
    }

    const deleteButton = document.getElementById("delete");
    if (deleteButton) {
        deleteButton.addEventListener("click", function() {
            if (confirm("Are you sure?")) {
                fetch(`http://localhost:8000/feature/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: "DELETE"
                })
                    .then(resp => resp.json())
                    .then(data => {
                        alert("Deleted feature with id " + data);
                        window.location.href = '/features.html';
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    document.getElementById("name").addEventListener("keypress", function(){
        this.classList.remove('success', 'error');
    });

});
