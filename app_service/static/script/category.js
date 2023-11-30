
let id = null;

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

    fetch(`http://localhost:8000/category/${id}`)
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

        const newCategory = {
            name: document.getElementById("name").value,
        };

        fetch("http://localhost:8000/category/", {
            method : "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(newCategory)
        })
            .then(succ => succ.json())
            .then(() => {
                window.location.href='/categories.html';
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

            const newCategory = {
                name: document.getElementById("name").value,
            };

            fetch(`http://localhost:8000/category/${id}`, {
                method : "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            })
                .then(succ=> succ.json())
                .then(() => {
                    window.location.href='/categories.html';
                })
                .catch(err => console.log(err));
        });
    }

    const deleteButton = document.getElementById("delete");
    if (deleteButton) {
        deleteButton.addEventListener("click", function() {
            if (confirm("Are you sure?")) {
                fetch(`http://localhost:8000/category/${id}`, { method: "DELETE" })
                    .then(resp => resp.json())
                    .then(data => {
                        alert("Deleted category with id " + data);
                        window.location.href = '/categories.html';
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    document.getElementById("name").addEventListener("keypress", function(){
        this.classList.remove('success', 'error');
    });

});
