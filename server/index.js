const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://mern-signup-fronend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
}));

// MongoDB connection
mongoose.connect("mongodb+srv://tripathivandana086:vandu123@cluster0.bminb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
    res.json("Hello, welcome to the backend!");
});

// Register endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json("All fields are required");
    }

    // Check for duplicate email
    EmployeeModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json("User already exists"); // 409: Conflict
            }

            // Save user
            EmployeeModel.create({ name, email, password })
                .then(employee => res.status(201).json(employee)) // 201: Created
                .catch(err => res.status(500).json({ error: "Internal Server Error" })); // 500: Internal Server Error
        })
        .catch(err => res.status(500).json({ error: "Internal Server Error" }));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email and password are required");
    }

    EmployeeModel.findOne({ email })
        .then(user => {
            if (user) {
                // Compare passwords directly
                if (user.password === password) {
                    res.status(200).json({ message: "Login successful" }); // 200: OK
                } else {
                    res.status(401).json("Incorrect password"); // 401: Unauthorized
                }
            } else {
                res.status(404).json("User not found"); // 404: Not Found
            }
        })
        .catch(err => res.status(500).json({ error: "Internal Server Error" }));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
