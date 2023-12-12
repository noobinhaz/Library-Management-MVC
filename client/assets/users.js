const token = localStorage.getItem("token");
const searchInput = document.getElementById("search");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let search = '';

function handleSearchInput(event) {
    
    search = event.target.value;
    fetchUser();
}

function fetchUser(){
    let page = urlParams.get('page') ?? 1;

fetch("http://localhost:8000/users?" + new URLSearchParams({
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
        const usersTableBody = document.getElementById("usersTableBody");
        usersTableBody.innerHTML = "";
        data.data.data.map((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                        `;
        usersTableBody.appendChild(row);
        });

        const paginator = document.getElementById('pagination');

        paginator.innerHTML = "";
        for(let i = 1; i <= data.data.last_page; i++){
            let page = document.createElement('button');
            page.style = "margin-right: 5px;";
            page.innerHTML = `<a href="users.html?page=${i}" style="color: green;">${i}</a>`;
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

searchInput?.addEventListener("input", handleSearchInput);