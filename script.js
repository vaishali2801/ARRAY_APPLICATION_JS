
let movies = [];

// ADD & UPDATE (push, splice)
document.getElementById("movieForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const rating = document.getElementById("rating").valueAsNumber;
    const year = document.getElementById("year").valueAsNumber;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "-1") {
        movies.push({ title, genre, rating, year });
    } else {
        movies.splice(editIndex, 1, { title, genre, rating, year });
        document.getElementById("editIndex").value = -1;
    }
    this.reset();
    renderTable(movies);
    showTitles();
});
// DISPLAY (forEach)
function renderTable(data) {
    const table = document.getElementById("movieTable");
    table.innerHTML = "";
    data.forEach((movie, index) => {
        table.innerHTML += `<tr>
                    <td>${index + 1}</td>
                    <td>${movie.title}</td>
                    <td>${movie.genre}</td>
                    <td>${movie.rating}</td>
                    <td>${movie.year}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editMovie(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMovie(${index})">Delete</button>
                    </td>
                </tr>
            `;
    });
}

// EDIT (find)
function editMovie(index) {
    const movie = movies.find((_, i) => i === index);
    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("rating").value = movie.rating;
    document.getElementById("year").value = movie.year;
    document.getElementById("editIndex").value = index;
}

// DELETE (splice)
function deleteMovie(index) {
    movies.splice(index, 1);
    renderTable(movies);
    showTitles();
}

// SEARCH (filter)
function searchMovie() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

// MAP + JOIN
function showTitles() {
    const titles = movies.map(movie => movie.title).join(" | ");
    document.getElementById("titlesOutput").innerHTML =
        `<strong>All Movie Titles:</strong> ${titles}`;
}