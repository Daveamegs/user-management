const User = require("../model/User")

// Retrieve All Users from the database
const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find()
    } catch (error) {
        return next(error)
    }
    if(!users){
        return res.status(500).json({"message": "Internal Server Error"})
    }

    return res.status(200).json({users})
}

// Add a User to the database
const addUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name && name.trim() == "" && !email && email.trim() === "" && !password && password.length() < 8){
        return res.status(422).json({message: "Invalid Data"})
    }

    let user;
    try {
        user = new User({
            name,
            email,
            password
        })

        user = await user.save();
        
    } catch (error) {
        return next(error);
    }

    if (!user){
        return res.status(500).json({message: "Internal Server Error"});
    }

    return res.status(201).json({message: "User Added Successfully"});
}

// Edit and update the User info in the database
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;

    if (!name && name.trim() == "", !email && email.trim() === "", !password && password.length() < 8){
        return res.status(422).json({message: "Invalid Data"})
    }

    // console.log(id)

    let user;
    try {
        user = await User.findByIdAndUpdate(id)
    } catch (error) {
        return next(error)
    }

    if (!user){
        return res.status(500).json({meassage: "Internal Server Error"})
    }

    return res.status(200).json({message: "Updated Successfully"})
}

// Delete a User from the database
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndRemove(id)
    } catch (error) {
        return next(error)
    }
    if (!user){
        return res.status(404).json({message: "User not found or does not exist"})
    }

    return res.status(200).json({message: "User Deleted Successfully"})

}

// Retrieve a User information by the user id
const getUserById = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        return next(error)
    }

    if (!user){
        return res.status(404).json({message: "User not found or does not exist"});
    }

    return res.status(200).json({ user });
}




exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;