import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';


// Create an instance of an Express application
const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://localhost:4200/',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Set up the multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

// Middleware to parse incoming JSON requests (not needed for file uploads)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// POST route to handle form submission with a file
app.post('/cart', upload.single('file'), (req, res) => {
    console.log('Form Data:', req.body);  // Logs the text data (e.g., name, email, category)
    console.log('Uploaded File:', req.file);  // Logs the uploaded file info

    // Send response back to the frontend
    res.json({
        message: 'File uploaded successfully!',
        file: req.file,
        name: req.body.name,
        email: req.body.email,  // Log the email data
        category: req.body.category  // Log the category data
    });
});


app.listen(port,()=>{
    console.log(`server is running at https://localhost:${port}`);
})