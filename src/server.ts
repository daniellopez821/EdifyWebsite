import express from 'express';
import cors from 'cors';
import mysql from 'mysql2'
// Create an instance of an Express application
const app = express();
const port = 3000;
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


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
app.post('/cart', upload.single('file'), (req, res) => {
    console.log('Form Data:', req.body);
    console.log('Uploaded File:', req.file);

    const { name, email, topic } = req.body;
    const filePath = req.file?.path || null; // Safely get file path

    const query = 'INSERT INTO accounts (Name, email, package, file_path) VALUES (?, ?, ?, ?)';

    connection.execute(query, [name, email, topic, filePath], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: 'Error saving item to cart' });
        } else {
            console.log('Insert results:', results);
            res.status(200).json({
                message: 'Item added to cart with file',
                filePath: filePath,
                data: results
            });
        }
    });
});


app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})