import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @desc Auth user n get token
// @route POST /api/users/login
// @acess Public
const authUser = asyncHandler(async (req,res) =>{
    const { email, password } = req.body

    const user = await User.findOne({ email: email }) // or just email since both are the "same"
    if(user && (await user.matchPassword(password))) {

        generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('E-mail ou password inválido')
    }
})

// @desc Register user n get token
// @route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req,res) =>{
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Usuário já existente')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Informações do usuário inválidas')
    }
})

// @desc Logout user n clear cookie
// @route POST /api/users/logout
// @acess Private
const logoutUser = asyncHandler(async (req,res) =>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'Deslogado com sucesso'})
})

// @desc Get user profile
// @route GET /api/users/profile
// @acess Public
const getUserProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('Usuário não encontrado!')
    }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('Usuário não encontrado!')
    }
})

// @desc Get users 
// @route GET /api/users/profile
// @acess Private/Admin
const getUsers = asyncHandler(async (req,res) =>{
    res.send('get users')
})

// @desc Get users by ID
// @route GET /api/users/:id
// @acess Private/Admin
const getUserByID = asyncHandler(async (req,res) =>{
    res.send('get user by ID')
})

// @desc Delete user 
// @route DELETE /api/users/:id
// @acess Private/Admin
const deleteUser = asyncHandler(async (req,res) =>{
    res.send('delete users')
})

// @desc Update user 
// @route PUT /api/users/:id
// @acess Private/Admin
const updateUser = asyncHandler(async (req,res) =>{
    res.send('update user')
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}