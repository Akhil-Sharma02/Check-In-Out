const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const sendMail = require('../mail.js');



const getTime = () => {
    let today = new Date();
    let currentTime = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0');
    return currentTime;
};

const getDate = () => {
    let today = new Date();
    let todayDate = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    return todayDate;
};



router.get('/', (req, res) => {
    res.render('pages/home');
});

router.get('/persons', async(req, res) => {
    const persons = await Person.find({});
    res.render('pages/persons',{persons});
});

router.post('/persons', async(req, res) => {
    const person = await Person.findOne({ name: { $eq: req.body.name.toUpperCase() }, phoneNumber: { $eq: req.body.phoneNumber }, email: { $eq: req.body.email } });
    currentTime = getTime();
    todayDate = getDate();
    if(person !== null){
        let id = person._id;
        if (person.isAvailable) {
            let val = person.days.shift();
            const obj = {
                date: val.date,
                checkIn: val.checkIn,
                checkOut: currentTime
            };
            person.days.unshift(obj);
            const newPerson = {
                ...req.body,
                name: req.body.name.toUpperCase(),
                isAvailable: false,
                days: person.days
            };
            await Person.findByIdAndUpdate(id, newPerson);
        }
        else{
            const obj = {
                date: todayDate,
                checkIn: currentTime,
                checkOut: "-"
            };
            person.days.unshift(obj);
            const newPerson = {
                ...req.body,
                name: req.body.name.toUpperCase(),
                isAvailable: true,
                days: person.days
            };
            await Person.findByIdAndUpdate(id, newPerson);
        }
        sendMail(req.body, todayDate, currentTime, !person.isAvailable);
    }
    
    else{
        const obj = {
            date: todayDate,
            checkIn: currentTime,
            checkOut: "-",
        };
        const newPerson = {
            ...req.body,
            name: req.body.name.toUpperCase(),
            isAvailable: true,
            days: [obj]
        };
        sendMail(req.body, todayDate, currentTime, true);
        await Person.create(newPerson);
    }
    
    res.redirect('/');
});

router.get("/persons/search", async (req, res) => {
    res.render('pages/search');
});

router.get("/search", async (req, res) => {
    const person = await Person.findOne({ name: { $eq: req.query.name.toUpperCase() }, phoneNumber: { $eq: req.query.phoneNumber }, email: { $eq: req.query.email } });
    if(person === null){
        res.render('pages/personNotFound');
    }
    res.redirect('/persons/'+person._id);
});

router.get("/persons/:id", async (req, res) => {
    const{ id } = req.params;
    const person = await Person.findById(id);
    res.render('pages/person',{ person });
});

router.delete("/persons/:id", async(req, res) => {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.redirect("/persons");
})



module.exports = router;