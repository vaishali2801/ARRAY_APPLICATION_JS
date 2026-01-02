// Array to store movie records
let movies = [];

// Submit event
document.getElementById("movieForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const rating = Number(document.getElementById("rating").value);
    const year = Number(document.getElementById("year").value);
    const editIndex = document.getElementById("editIndex").value;

    // ✅ VALIDATIONS FIRST
    if (rating < 1 || rating > 10) {
        alert("Rating must be between 1 and 10");
        return;
    }

    if (year < 1000 || year > 9999) {
        alert("Year must be a 4-digit number");
        return;
    }

    if (movies.length >= 20 && editIndex === "-1") {
        alert("Movie limit reached!");
        return;
    }

    // ✅ ADD / UPDATE MOVIE
    const movieData = { title, genre, rating, year };

    if (editIndex === "-1") {
        movies.push(movieData);
    } else {
        movies[editIndex] = movieData;
        document.getElementById("editIndex").value = -1;
    }

    this.reset();
    displayMovies();
});

// Display movies
function displayMovies() {
    const table = document.getElementById("movieTable");
    const output = document.getElementById("titlesOutput");

    table.innerHTML = "";

    movies.forEach((movie, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>${movie.rating}</td>
                <td>${movie.year}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editMovie(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMovie(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    const titles = movies.map(movie => movie.title);
    output.innerText = titles.length
        ? "🎥 Movie Titles: " + titles.join(", ")
        : "Movie Titles Will Appear Here";
}

// Edit movie
function editMovie(index) {
    const movie = movies[index];
    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("rating").value = movie.rating;
    document.getElementById("year").value = movie.year;
    document.getElementById("editIndex").value = index;
}

// Delete movie
function deleteMovie(index) {
    movies.splice(index, 1);
    displayMovies();
}
