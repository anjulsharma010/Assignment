const express = require('express');
const jsonfile = require('jsonfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());


const usersFile = 'users.json';
const secretKey = 'your_secret_key'; // Change this to a secure key

// Function to read users from the JSON file
const readUsers = async () => {
    try {
        return await jsonfile.readFile(usersFile);
    } catch (err) {
        return []; // Return empty array if file not found
    }
};

// Function to write users to the JSON file
const writeUsers = async (users) => {
    await jsonfile.writeFile(usersFile, users, { spaces: 2 });
};

// Register API
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Read existing users
    const users = await readUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    // Save new user to JSON file
    await writeUsers(users);
    
    const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
    res.json({ token, "user": {email, name }});
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let name = "";
    // Read existing users
    const users = await readUsers();
    // Find user
    const user = users.find(user => user.email == email);
    name = user.name;
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token, "user": {email, name }});
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Example of a protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
