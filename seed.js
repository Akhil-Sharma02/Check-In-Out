const Person = require('./models/person');

const arr = [
    {
        name: 'ABC',
        phoneNumber: 1,
        email: 'a',
        days: [
            {
                date: '27-09-2021',
                checkIn: '09:30',
                checkOut: '22:30'
            },
            {
                date: '26-09-2021',
                checkIn: '09:10',
                checkOut: '23:00'
            },
            {
                date: '25-09-2021',
                checkIn: '09:00',
                checkOut: '23:00'
            }
        ]
    },
    {
        name: 'XYZ',
        phoneNumber: 2,
        email: 'x',
        days: [
            {
                date: '27-09-2021',
                checkIn: '08:30',
                checkOut: '20:30'
            },
            {
                date: '26-09-2021',
                checkIn: '08:10',
                checkOut: '20:30'
            },
            {
                date: '25-09-2021',
                checkIn: '08:00',
                checkOut: '20:00'
            }
            
        ]
    },
    {
        name: 'PQR',
        phoneNumber: 3,
        email: 'p',
        days: [
            {
                date: '27-09-2021',
                checkIn: '07:30',
                checkOut: '19:30'
            },
            {
                date: '26-09-2021',
                checkIn: '07:10',
                checkOut: '19:00'
            },
            {
                date: '25-09-2021',
                checkIn: '07:00',
                checkOut: '19:00'
            }
        ]
    }
]


const seedDB = async() => {
    await Person.deleteMany({});
    await Person.insertMany(arr);
    console.log("Db Seeded");
};

module.exports = seedDB;