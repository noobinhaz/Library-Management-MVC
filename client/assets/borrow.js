const token = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchInput = document.getElementById("search");

let search = '';

function handleSearchInput(event) {
    
    search = event.target.value;
    fetchBorrow();
}
searchInput?.addEventListener("input", handleSearchInput);

      
function fetchBorrow() {
  let page = urlParams.get('page') ?? 1;
  console.log(page);

    fetch("http://localhost:8000/borrows?" + new URLSearchParams({
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
        console.log(data.data.data);
        if (data.isSuccess) {
            const borrowTableBody =
            document.getElementById("borrowTableBody");
            borrowTableBody.innerHTML = ""; // Clear existing data

            data.data.data.map((borrow, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                                <td>${index + 1}</td>
                                <td>${borrow.email}</td>
                                <td>${borrow.book_name}</td>
                                <td>${borrow.borrow_date}</td>
                                <td>${
                                    borrow.return_date != '0000-00-00'
                                    ? borrow.return_date
                                    : "--"
                                }</td>
                                <td><button onclick="editBorrow(${
                                    borrow.id
                                })">Edit</button></td>
                            `;
            borrowTableBody.appendChild(row);

            
        });
        const paginator = document.getElementById('pagination');

        paginator.innerHTML = "";
        for(let i = 1; i <= data.data.last_page; i++){
            let page = document.createElement('button');
            page.style = "margin-right: 5px;";
            page.innerHTML = `<a href="borrow.html?page=${i}" style="color: green;">${i}</a>`;
            paginator.append(page);
        }
        } else {
            console.error("Error fetching authors:", data.message);
        }
        })
        .catch((error) => {
        console.error("Fetch error:", error);
        });
    }
function editBorrow(id) {
    window.location.replace("/client/editBorrow.html?id=" + id);
}

function fetchBooks() {
    const bookDropdown = document.getElementById("book_id");

    // Make a GET request to fetch book options
    fetch("http://localhost:8000/books", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          // Clear existing options
          bookDropdown.innerHTML = "";
        
          data.data.data.forEach((book) => {
            const option = document.createElement("option");
            option.value = book.id;
            option.textContent = book.name;
            bookDropdown.appendChild(option);
          });
        } else {
          console.error("Error fetching books:", data.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  // Function to handle form submission
  function addBorrow(event) {
    document
    .getElementById("addBorrowForm")
    .addEventListener("submit", function (e){

        e.preventDefault();
    
        const formData = new FormData(this);
    
        // Make a POST request to add a borrow entry
        fetch("http://localhost:8000/borrows", {
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
              alert("Error adding borrow info: " + data.message);
              console.error("Error adding borrow entry:", data.message);
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
    } );
  }

  function fetchBorrowDetails() {
    const borrowId = new URLSearchParams(window.location.search).get("id");
    const borrowForm = document.getElementById("editBorrowForm");

    // Make a GET request to fetch borrow details
    fetch(`http://localhost:8000/borrows/${borrowId}`, 
    { method: "GET", 
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
  })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.isSuccess) {
          // Populate the form fields with borrow details
          const borrow = data.data;
          document.getElementById("borrowId").value = borrow.id;
          document.getElementById("user").value = borrow.user;
          document.getElementById("borrow_date").value = borrow.borrow_date;
          document.getElementById("return_date").value = borrow.return_date;
          // Manually trigger the book selection dropdown to populate options
          fetchBooks(borrow.book_id);
        } else {
          console.error("Error fetching borrow details:", data.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }


  // Function to handle form submission
  function updateBorrow() {
    document
        .getElementById("editBorrowForm")
        .addEventListener("submit", function (e) {

          e.preventDefault();
      
          const borrowId = document.getElementById("borrowId").value;
          
          const borrow_date = document.getElementById("borrow_date").value;
          const return_date = document.getElementById("return_date").value;

          const data = {
            "borrow_date" : borrow_date,
            "return_date" : return_date
          };
      
          fetch(`http://localhost:8000/borrows/${borrowId}`, {
            method: "PATCH",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.isSuccess) {
                // Redirect to the borrow.html page after successful update
                window.location.href = "borrow.html";
              } else {
                console.error("Error updating borrow entry:", data.message);
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        });
  }


  // Add event listeners
// window.addEventListener("load", fetchBooks);

