const token = localStorage.getItem("token");
const searchInput = document.getElementById("search");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let search = '';

function handleSearchInput(event) {
    
    search = event.target.value;
    fetchBooks();
}

function fetchBooks() {
    let page = urlParams.get('page') ?? 1;

fetch("http://localhost:8000/books?" + new URLSearchParams({
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
        console.log(data)
    if (data?.isSuccess) {
        const booksTableBody =
        document.getElementById("booksTableBody");
        booksTableBody.innerHTML = "";
        data.data.data.map((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${book.name}</td>
                    <td>${book.version}</td>
                    <td>${book.author_name}</td>
                    <td>${book.release_date}</td>
                    <td>${book.isbn_code}</td>
                    <td>${book.sbn_code}</td>
                    <td>${book.shelf_position}</td>
                    <td><button onClick="deleteBook(${
                    book.id
                    })">Delete</button></td>
                            
                        `;
        booksTableBody.appendChild(row);
        });

        const paginator = document.getElementById('pagination');

        paginator.innerHTML = "";
        for(let i = 1; i <= data.data.last_page; i++){
            let page = document.createElement('button');
            page.style = "margin-right: 5px;";
            page.innerHTML = `<a href="books.html?page=${i}" style="color: green;">${i}</a>`;
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

function deleteBook(id) {
fetch("http://localhost:8000/books/" + id, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
    if (data.isSuccess) {
        fetchBooks(search);
    } else {
        console.error("Error Deleting authors:", data.message);
    }
    })
    .catch((error) => {
    console.error("Fetch error:", error);
    });
}

function populateAuthorDropdown() {
    const authorDropdown = document.getElementById("author");

    fetch("http://localhost:8000/authors", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
            const option = document.createElement("option");
            option.value = 0;
            option.textContent = "Select";
            authorDropdown.appendChild(option);
          data.data.data.forEach((author) => {
            const option = document.createElement("option");
            option.value = author.id;
            option.textContent = author.name;
            authorDropdown.appendChild(option);
          });
        } else {
          console.error("Error fetching authors:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function addBooks(){
      document
        .getElementById("bookForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
    
          const formData = new FormData(this);
    
          fetch("http://localhost:8000/books", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.isSuccess) {
                alert("Book added successfully.");
                window.location.reload();
              } else {
                alert(data.message);
                console.log(data.data);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("An error occurred while adding the book.");
            });
        });
  }

  populateAuthorDropdown();

window.addEventListener("load", fetchBooks);

searchInput?.addEventListener("input", handleSearchInput);