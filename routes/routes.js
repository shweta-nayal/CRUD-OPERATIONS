const express = require("express");
const router = express.Router();
const User = require('../models/users');
const multer = require("multer");

// Image upload configuration
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        // Corrected the typo: 'filedname' -> 'filename'
        cb(null, file.filename + "_" + Date.now() + "_" + file.originalname); // Use original name and add timestamp
    },
});

var upload = multer({
    storage: storage,
}).single("image");

// Add user route (with file upload)
router.post('/add', upload, async (req, res) => {
    try {
        // Create a new user object with form data and uploaded file
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,  // Store the image filename
        });

        // Save the user to the database
        await user.save();

        // Set a success message in the session
        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };

        // Redirect to the homepage (list of users)
        res.redirect("/");  
    } catch (err) {
        // Handle any errors and return them in the response
        res.json({ message: err.message, type: 'danger' });
    }
});

// Display all users
router.get("/", async (req, res) => {
    try {
        // Fetch all users from the database using async/await
        const users = await User.find({});

        // Render the home page and pass the users data to the view
        res.render('index', {
            title: 'Home Page',
            users: users,
        });
    } catch (err) {
        // Handle errors (e.g., DB errors)
        res.status(500).json({ message: err.message });
    }
});

// Render the add user form
router.get("/add", (req, res) => {
    res.render('add_users', { title: "Add New User" });
});

//edit an user routes
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        // Use async/await to get the user by id
        const user = await User.findById(id);

        // If the user does not exist, redirect to the homepage
        if (!user) {
            return res.redirect('/');
        }

        // Render the edit user form if the user exists
        res.render('edit_users', {
            title: 'Edit User',
            user: user,
        });
    } catch (err) {
        // If there's an error, redirect to the homepage
        console.error(err);
        res.redirect('/');
    }
});

//update user route
router.post("/update/:id", upload, (req,res) => {
    let id = req.params.id;
    let new_image = "";

    if(req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync('./uploads/' + req.body.old_image)
        }
        catch(err){
            console.log(err);
        }
    }
    else{
            new_image = req.body.old_image;
        }
    User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: new_image,
    }, (err, result) => {
        if(err){
            res.json({message: err.message,type: 'danger'});
        }
        else{
            req.session.message = {
                type: 'success',
                message: 'User updated successfully..!!',
            };
            res.redirect('/');
        }
    })
});



module.exports = router;
