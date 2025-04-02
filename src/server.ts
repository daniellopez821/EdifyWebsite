import express from 'express';
import cors from 'cors';
import mysql from 'mysql2'
// Create an instance of an Express application
const app = express();
const port = 3000;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Felipe02102*',
    database: 'edify_website'
});


app.use(cors());

// Middleware to parse incoming JSON requests (not needed for file uploads)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST route to handle form submission with a file
app.post('/cart', (req, res) => {
    console.log('Form Data:', req.body);  // Logs the text data (e.g., name, email, category)
    const { name, email, topic } = req.body;

    const query = 'INSERT INTO accounts (Name, email, package) VALUES (?, ?, ?)';

    connection.execute(query, [name, email, topic], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: 'Error saving item to cart' });
        } else {
            console.log('Insert results:', results);
            res.status(200).json({ message: 'Item added to cart', data: results });
        }
    });

});

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})