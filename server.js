const express = require('express')
const morgan = require('morgan')
const colors = require('colors')
// const { products } = require('./model/products')
// const { pool } = require('./db')

const pg = require('pg')
const { Pool } = pg;

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json())
app.use(morgan('dev'))

const pool = new Pool({
    user: "admin",         // your postgres username
    host: "localhost",
    database: "mydb",       // your database name
    password: "mayur", // your postgres password
    port: 5432,
});

// Test DB connection and define route
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Connected to PostgreSQL".bgGreen);
        console.log("DB Time:", result.rows[0]);

        // send response to browser
        res.json({
            success: true,
            message: "Database connected successfully!",
            db_time: result.rows[0].now,
        });


    } catch (err) {
        console.error("Error connecting to DB:".bgRed, err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`.bgGreen)
})