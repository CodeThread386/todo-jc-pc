const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const Todo = require("./models/Todo")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err))

app.get("/", (req, res) => {
    res.json({ msg: "todo list server running" })
})

app.get("/todos", async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.get("/todo/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if (todo) {
        res.json({ msg: "task found", data: todo })
    } else {
        res.json({ msg: "task not found" })
    }
})

app.post("/todo", async (req, res) => {
    const todo = await Todo.create({ desc: req.body.desc, comp: req.body.comp })
    res.json({ msg: "task added", data: todo })
})

app.put("/todo/:id", async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { desc: req.body.desc, comp: req.body.comp },
        { new: true }
    )
    if (todo) {
        res.json({ msg: "todo edited", data: todo })
    } else {
        res.json({ msg: "todo not found" })
    }
})

app.delete("/todo/:id", async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (todo) {
        res.json({ msg: "todo deleted", data: todo })
    } else {
        res.json({ msg: "todo not found" })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
