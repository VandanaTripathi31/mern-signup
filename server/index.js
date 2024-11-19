const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())
{
    origin: [""]
    methods: ["POST", "GET"]
    credentials: true
}

mongoose.connect("mongodb+srv://tripathivandana086:vandu123@cluster0.bminb.mongodb.net/");


app.get("/", (req,res) => {
    res.json("Hello");
})
app.post('/login', (req, res) => {
    const { email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")

            } 

        } else {
                res.json("No record existed")
            }
    })
})

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("Server is running")
})