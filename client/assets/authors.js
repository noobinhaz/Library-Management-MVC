const token = localStorage.getItem("token");
const searchInput = document.getElementById("search");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let search = '';

function handleSearchInput(event) {
    
    search = event.target.value;
    fetchAuthors();
}

function fetchAuthors() {
    let page = urlParams.get('page') ?? 1;

fetch("http://localhost:8000/authors?" + new URLSearchParams({
    page: page,
    search: search,
    limit: 10
}), {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
    if (data?.isSuccess) {
        const authorsTableBody =
        document.getElementById("authorsTableBody");
        authorsTableBody.innerHTML = "";
        data.data.data.map((author, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${author.name}</td>
                            <td>${author.dob}</td>
                            <td><button onclick="deleteAuthor(${
                                author.id
                            })">Delete</button></td>
                        `;
        authorsTableBody.appendChild(row);
        });

        const paginator = document.getElementById('pagination');

        paginator.innerHTML = "";
        for(let i = 1; i <= data.data.last_page; i++){
            let page = document.createElement('button');
            page.style = "margin-right: 5px;";
            page.innerHTML = `<a href="authors.html?page=${i}" style="color: green;">${i}</a>`;
            paginator.append(page);
        }

    } else {
        console.error("Error fetching authors:", data?.message);
    }
    })
    .catch((error) => {
        console.error("Fetch error:", error);
    });
}

function deleteAuthor(id) {
fetch("http://localhost:8000/authors/" + id, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
    if (data.isSuccess) {
        fetchAuthors(search);
    } else {
        console.error("Error Deleting authors:", data.message);
    }
    })
    .catch((error) => {
    console.error("Fetch error:", error);
    });
}

function addAuthor(){
    document
        .getElementById("authorForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          
          const formData = new FormData(this);

          console.log(formData.entries());

          // Send a POST request to the server with the form data
          fetch("http://localhost:8000/authors", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.isSuccess) {
                alert("Author added successfully.");
                history.back();
              } else {
                alert("Error adding author: " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("An error occurred while adding the author.");
            });
        });
}

window.addEventListener("load", fetchAuthors);

searchInput?.addEventListener("input", handleSearchInput);