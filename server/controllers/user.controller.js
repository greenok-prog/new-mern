import User from "../models/User.js";
import bcrypt from "bcrypt"
import fs from 'fs'
import config from 'config'
import Card from "../models/Card.js";


//admin panel
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json({ users })
    } catch (e) {
        res.json({ message: "Пользователи не найдены" })
    }
}
export const deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.body.userId)
        res.status(200).json({ message: "Пользователь удален" })
    } catch (e) {
        res.status(401).json({ message: "Произошла ошибка при удалении" })
    }
}
export const changeUserData = async (req, res) => {
    try {
        const { email, username, firstName, secondName, _id } = req.body

        const user = await User.findById()
    } catch (e) {
        res.json({ message: "Произошла ошибка при изменении" })
    }
}




// user actions
export const changeEmail = async (req, res) => {
    try {
        const data = req.body
        let currentUser = await User.findOne({ _id: data.userId })
        const candidate = await User.findOne({ email: data.email })

        const isPassValid = bcrypt.compareSync(data.password, currentUser.password)
        if (!isPassValid) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }
        if (candidate) {
            return res.status(400).json({ message: 'Пользователь с данным email уже существует' })
        }
        await User.findByIdAndUpdate(data.userId, { email: data.email })
        currentUser = await User.findOne({ _id: data.userId })
        res.json({ message: "Данные обновлены", email: currentUser.email })
    } catch (e) {
        res.status(400).json({ message: "Произошла ошибка" })
    }
}
export const changeProfileInfo = async (req, res) => {
    try {
        const data = req.body

        await User.findByIdAndUpdate(data.userId, { username: data.username, firstName: data.firstName, secondName: data.secondName, userLink: data.userLink, githubLink: data.githubLink })
        const currentUser = await User.findOne({ _id: data.userId })
        res.status(200).json({ currentUser, message: 'Данные успешно изменены' })
    } catch (e) {
        res.status(400).json({ message: "Произошла ошибка" })
    }
}
export const changePassword = async (req, res) => {
    try {
        const data = req.body

        const currentUser = await User.findOne({ _id: data.userId })
        const isPassValid = bcrypt.compareSync(data.oldPas, currentUser.password)
        if (!isPassValid) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }
        const hashPassword = await bcrypt.hash(data.newPas, 7)
        await User.findByIdAndUpdate(data.userId, { password: hashPassword })

        res.status(200).json({ message: 'Пароль успешно изменен' })
    } catch (e) {
        return res.status(400).json({ message: "Произошла ошибка при изменении" })
    }
}
export const changeAvatar = async (req, res) => {
    try {
        const file = req.file
        const data = req.body
        const user = await User.findById(data.userId)
        const path = config.get('staticPath') + '\\'

        if (fs.existsSync(path + user.avatar)) {
            fs.unlinkSync(path + user.avatar)
        }

        await User.findByIdAndUpdate(data.userId, { avatar: file.filename })
        const currentUser = await User.findOne({ _id: data.userId })
        return res.status(200).json({ avatar: currentUser.avatar, message: 'Данные успешно изменены' })


    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Не удалось изменить фото' })
    }
}


export const buyCourse = async (req, res) => {
    try {
        const { userId, cardId } = req.body
        const user = await User.findByIdAndUpdate(userId, { "$push": { purchasedCourses: cardId } }, { new: true })
        await Card.findByIdAndUpdate(cardId, { $inc: { popular: 1 } })
        return res.status(200).json({ currentUser: user, message: 'Курс успешно куплен' })
    } catch (error) {
        return res.status(400).json({ message: "Произошла ошибка при покупке" })
    }
}

