const { response } = require("express");
const express = require("express")
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password123@",
    database: "movies_db"
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/movies", (req, res) => {
    db.query('SELECT * FROM movies', function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(results)
        }
    })
});


app.post("/api/add-movie", (req, res) => {
    console.log("post request received")
    const {id, movie_name} = req.body; 
    if (id && movie_name) {
        const newMovie = {
            id,
            movie_name
        };
        db.query(`INSERT INTO movies (id, movie_name) VALUES (${newMovie.id}, ${newMovie.movie_name})`)
    }
    else {
        res.json("err in adding new movie")
    }

});

// app.patch("/api/update-review", (req, res) => {
//     console.log('patch request received')
//     db.query(`UPDATE reviews SET review = (${}) review WHERE id (${reviews.id})`)
// })

app.delete("/api/movie/:id", (req, res) => {
    console.log("delete request working")
    db.query(`DELETE FROM movies WHERE id = (${movies.id})`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })