const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const xlsxFile = require('read-excel-file/node');
const { Pool, Client } = require('pg')
const db = require('Knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Leinads',
        database: 'Farmers_App'
    }
})

const app = express();
app.use(express.json());
app.use(cors());



///=====================================
// const pool = new Pool({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'Farmers_App',
//     password: 'Leinads',
//     port: 5432,
// })

client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Farmers_App',
    password: 'Leinads',
    port: 5432,
});
client.connect()
//======================================

app.get('/', (req, res) => {

    res.status(200).json("Farmers' App...");
})


app.get('/farmers', (req, res) => {
    db.select('*').from('farms')
        .then(allFarms => {
            res.status(200).json(allFarms);
        })
})

app.get('/food', (req, res) => {
    db.select('*').from('products')
        .then(allProduct => {
            res.status(200).json(allProduct);
        })
})

app.post('/addfarmer', (req, res) => {
    let index = 0;
    db.select('*').from('farms')
        .then(allFarms => {
            index = allFarms.length

            if (index > 0) {
                return db('farms')
                    .returning('*')
                    .insert({
                        id: ++index,
                        name: req.body.name,
                        address: req.body.address,
                        contact: req.body.contact,
                        latitude: req.body.lat,
                        longitude: req.body.long
                    }).then(user => {
                        res.status(201).json(user[0]);
                    })
            }
        })
})

app.post('/farmer_product', (req, res) => {
    // SELECT f.name, p.name, price FROM farms AS f 
    // JOIN farmer_product 
    // ON f.id = farmer_product.farm_id
    // JOIN products AS p
    // ON  farmer_product.product_id= p.id
    // where f.name = 'Alliance';

    //=============
    const txt = "SELECT f.name, p.name, price FROM farms AS f JOIN farmer_product ON f.id = farmer_product.farm_id JOIN products AS p ON  farmer_product.product_id= p.id where f.name = $1"
    const val = [req.body.name]

    client
        .query(txt, val)
        .then(resp => {
            // console.log(resp.rows[0])
            res.status(201).json(resp.rows);
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        })
        .catch(e => res.status(400).json(e.stack))
})


app.listen(4000, () => {
    console.log("server is running on port 4000")
});

//============= Query to send data to database ========================

// arr = [];
// fetch('http://127.0.0.1:3500/food')
//     .then(response => response.json())
//     .then(data => {
//         let x;
//         for (x in data) {
//             arr.push(data[x]);
//         }

//         for (let i = 0; i < arr.length; i++) {
//             db('products')
//                 .insert({
//                     id: i,
//                     item_name: arr[i].name,
//                     bot_name: arr[i].botanicalname,
//                     other_names: arr[i].othernames,
//                     image_URL: arr[i].imageurl

//                 })
//                 .then(user => {
//                     console.log(user)
//                 }).catch(err => console.log(err))
//         }
//         // res.status(201).json(arr);
//     })
//     .catch(err => res.send(err))

///============= Method used to read from excel
// xlsxFile('../API/food.xlsx').then((rows) => {
//     data = []
//     // console.log(rows);
//     // console.table(rows);
// })