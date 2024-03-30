import express from "express";
import cors from "cors";
import mysql from "mysql";


const app = express();
app.use(express.json());
app.use(cors());

//create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expencetracker"

});

//create API
app.get("/", (req,res) =>{
    //res.json("Hello from backend");
    const sql = "SELECT * FROM expences";
    
    db.query(sql,(err,data) => {
        if(err) return res.json("Error select");
        return res.json(data);
    });
});

app.post("/create",(req,res) => {
    const sql = "INSERT INTO expences (`description`, `amount`, `categories`) VALUES (?)";
    const values = [
        req.body.description,
        req.body.amount,
        req.body.category

    ]
    db.query(sql,[values],(err,data)=>{
        if(err)return res.json("Error from create");
        return res.json(data);
    })
});

app.put("/update/:id",(req,res) => {

    const sql = "UPDATE expences SET `description` = ?, `amount` = ?, `categories` = ? WHERE id =?";
    const values = [
        req.body.description,
        req.body.amount,
        req.body.category
    ]

    const id = req.params.id;
    db.query(sql,[...values,id],(err,data)=>{
        if(err)return res.json("Error from update");
        return res.json(data);
    })
    
})


app.delete("/expences/:id",(req,res) => {
    const sql = "DELETE FROM expences WHERE id =?";

    const id = req.params.id;
    db.query(sql,[id],(err,data)=>{
        if(err)return res.json("Error");
        return res.json(data);
    })
})
app.listen(8081,() => {
    console.log("Listening");
})