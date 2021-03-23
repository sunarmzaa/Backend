//npm init -y

//npm i -g nodemon
//npm i -s -d nodemon
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 3001;

app.use(cors()); //fontend เรียก API backend
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

//ข้อมูล
let pets = {
    list: [
        { id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },
        { id: 2, type: 'dog', age: 1, weight: 10, price: 3000 }
    ]
}




//nodemon index.js

//route
//http://localhost:6969/api/products PORT 6969
//http://localhost/api/product PORT 80
//CTRL D for select


router
    .route("/pets")
    .get((req, res) => {
        res.json(pets); //res.send(product)
    })
    //เพิ่มข้อมูล
    .post((req, res) => {
        let id = pets.list.length ? pets.list[pets.list.length - 1].id + 1 : 1; //หา id ล่าสุดที่จะสร้างใหม่
        //console.log(products.list[products.list.length - 1].id + 1)
        let newpets = {};
        newpets.id = id;
        newpets.type = req.body.type;
        newpets.age = req.body.age;
        newpets.weight = req.body.weight;
        newpets.price = req.body.price;
        //เอาข้อมูลมาใส่ต่อใน products
        pets = { list: [...pets.list, newpets] };
        //console.log(req.body.name);
        res.json(pets);
        //res.send(products)
    });

//แก้ไข และ ลบ
router
    .route("/pets/:petsid") //: => ... param
    //findIndex
    .get((req, res) => {
        let id = pets.list.findIndex(
            (item) => item.id == +req.params.petsid
        );
        if (id >= 0) {
            res.json(pets.list[id]);
        } else
            res.json("Can't get");
    })
    //แก้ไช
    .put((req, res) => {
        let id = pets.list.findIndex(
            (item) => item.id == +req.params.petsid
        );
        //console.log(id);
        console.log("id = ", id);
        if (id == -1) {
            res.json("Can't Put");
        } else {
            pets.list[id].type = req.body.type;
            pets.list[id].age = req.body.age;
            pets.list[id].weight = req.body.weight;
            pets.list[id].price = req.body.price;
            res.json(pets);
        }
    })

    .delete((req, res) => {
        const petsid = req.params.petsid;
        console.log("pets: ", petsid);

        let id = pets.list.findIndex(
            (item) => item.id == +req.params.petsid
        );
        if (id >= 0) {
            pets.list = pets.list.filter((item) => +item.id !== +petsid);
            //console.log(products.list);
            res.json(pets.list);
        } else {
            res.json("Can't Delete");
        }
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let income = 0;
router
    .route("/income")
    .get((req, res) => {
        res.json(income); //res.send(product)
    });
//////////

let purchase = {
    list: [
        { id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },
        { id: 2, type: 'dog', age: 1, weight: 10, price: 3000 }
    ]
}
router
    .route("/purchase")
    .get((req, res) => {
        res.json(purchase); //res.send(product)
    })
    .post((req, res) => {
        let id = purchase.list.length ? purchase.list[purchase.list.length - 1].id + 1 : 1; //หา id ล่าสุดที่จะสร้างใหม่
        //console.log(products.list[products.list.length - 1].id + 1)
        let newpurchase = {};
        newpurchase.id = id;
        newpurchase.type = req.body.type;
        newpurchase.age = req.body.age;
        newpurchase.weight = req.body.weight;
        newpurchase.price = req.body.price;
        //เอาข้อมูลมาใส่ต่อใน products
        purchase = { list: [...purchase.list, newpurchase] };
        //console.log(req.body.name);

        if (id >= 0) {
        res.json(purchase);
        }
        else
        res.json("Pet not found");
    
        
        //res.send(products)
    });






    app.listen(PORT, () => {
        console.log("Server running is port", PORT);
    });