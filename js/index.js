const express = require("express");
const cors = require('cors');
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(cors()); 
app.use(bodyParser.json());

/* ---------------------------------------------------------------- */

// зчитування файлу
function getComments() {
    const data = fs.readFileSync("../json/comments.json", "utf8");
    return JSON.parse(data);
}

// запис інфи
function writeComments(comments) {
    fs.writeFileSync("../json/comments.json", JSON.stringify(comments), "utf8");
}

/* ---------------------------------------------------------------- */

// output all comments
app.get("/comments", (req, res) => {
    const comments = getComments();
    res.send(comments);
});

// find comment
app.get("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const comments = getComments();
    const comment = comments.find((comment) => comment.id === id);
    res.send(comment);
});

// add
app.post("/comments", (req, res) => {
    const newComment = req.body;
    const comments = getComments();
    const lastId = comments.length > 0 ? comments[comments.length - 1].id : 0;
    const newId = lastId + 1;
    comments.push({
        id: newId,
        carId: newComment.carId,
        name: newComment.name,
        comments: newComment.comments,
    });
    writeComments(comments);
    res.send({ message: "Successfully added comment", comment: { ...newComment, id: newId } });
});

// update
app.put("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const newComment = req.body;
    const comments = getComments();
    const index = comments.findIndex((comment) => comment.id === id);
    comments[index] = { ...comments[index], ...newComment };
    writeComments(comments);
    res.send({ message: "Successfully updated comment", comments });
});

// delete
app.delete("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let comments = getComments();
    const index = comments.findIndex((comment) => comment.id === id);
    comments.splice(index, 1);
    writeComments(comments);
    res.send({ message: "Successfully deleted comment", comments });
});

/* ---------------------------------------------------------------- */

// check if server started
app.listen(3000, () => {
    console.log("Server started!");
});

/* ---------------------------------------------------------------- */



