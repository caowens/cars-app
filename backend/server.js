/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// To support cors. 
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
 app.use(bodyParser.json());

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/
app.get("/cars", (req, res) => {
    res.send(carsMockData);
}); 




/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */
app.post("/save", (req, res) => {
    let id = req.body.id;
    let brand = req.body.brand;
    let name = req.body.name;
    let releaseYear = req.body.releaseYear;
    let color = req.body.color;

    carsMockData.forEach((car) => {
        if (car.id === id) {
            res.sendStatus(500).send('Car already exists');
            return;
        }
    })

    carsMockData.push({"id": id, "brand": brand, "name": name, "releaseYear": releaseYear, "color": color});
    console.log(carsMockData);
    res.sendStatus(200);
})




/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */
app.put("/edit", (req,res) => {
    let id = req.body.id;
    let brand = req.body.brand;
    let name = req.body.name;
    let releaseYear = req.body.releaseYear;
    let color = req.body.color;

    carsMockData.forEach((car) => {
        if (car.id === id) {
            car.brand = brand;
            car.name = name;
            car.releaseYear = releaseYear;
            car.color = color;
            console.log(carsMockData);
            res.sendStatus(200);
        }
    })

    console.log('No car with given id exist');
    res.sendStatus(500);
})



/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/
app.delete("/delete", (req, res) => {
    let id = req.body.id;
    deleted = False;
    
    carsMockData.forEach((car) => {
        if (car.id === id) {
            let index = carsMockData.indexOf(car);
            carsMockData.splice(index, 1);
            console.log(carsMockData);
            deleted = True;
            res.sendStatus(200);
        }
    });

    console.log('No car with given id exists');
    res.sendStatus(500);
})

app.listen(8000);