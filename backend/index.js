const express = require("express")
const uuid = require("uuid")
const cors = require("cors")
const port = 3000

const app = express()

let todos = [
    {
        id: 1,
        desc: "write js1",
        comp: false
    },
    {
        id: 2,
        desc: "write js2",
        comp: false
    },
    {
        id: 3,
        desc: "write js3",
        comp: false
    },
    {
        id: 4,
        desc: "write js4",
        comp: false
    },
]

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=> {
    res.json({msg: "todo list server running"})
})

app.get("/todos", (req, res)=>{
    res.json(todos)
})

app.get("/todo/:id", (req,res)=>{
    console.log(req.params.id)
    let todo = todos.find((i)=> i.id==req.params.id)
    if(todo) {
        res.json({
            msg: "task found",
            data: todo
        })
    } else {
        res.json({
            msg: "task not found"
        })
    }
})

app.post("/todo", (req,res)=> {

    console.log(req.body)
    todos.push({id: uuid.v4(), ...req.body})
    res.json({
        msg: "task added",
        data: todos
    })
})

app.put("/todo/:id", (req,res)=>{
    let el = todos.find((i)=> i.id == req.params.id)
    if(el) {
        el.desc = req.body.desc
        el.comp = req.body.comp

        res.send({
            msg: "todo editted",
            data: todos
        })
    } else {
        res.send({
            msg: "todo not found"
        })
    }
})

app.delete("/todo/:id", (req,res)=>{
    let el = todos.findIndex((i)=> i.id == req.params.id)
    if(el !== -1) {
        todos.splice(el, 1)
        res.send({
            msg: "todo deleted",
            data: todos
        })
    } else {
        res.send({
            msg: "todo not found"
        })
    }
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})