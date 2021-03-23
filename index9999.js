//npm init -y
 
//npm i -g nodemon
//npm i -s -d nodemon
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 6969;

app.use(cors()); //fontend เรียก API backend
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

//ข้อมูล
let products = {
    list: [
        { id: 1, name: "A", price: 123, amount: 10 },
        { id: 2, name: "B", price: 456, amount: 20 },
    ],
};

//nodemon index.js

//route
//http://localhost:6969/api/products PORT 6969
//http://localhost/api/product PORT 80
//CTRL D for select

router
    .route("/products")
    .get((req, res) => {
        res.json(products); //res.send(product)
    })
    //เพิ่มข้อมูล
    .post((req, res) => {
        let id = products.list.length ? products.list[products.list.length - 1].id + 1: 1; //หา id ล่าสุดที่จะสร้างใหม่
        //console.log(products.list[products.list.length - 1].id + 1)
        let newproducts = {};
        newproducts.id = id;
        newproducts.name = req.body.name;
        newproducts.price = req.body.price;
        newproducts.amount = req.body.amount;
        //เอาข้อมูลมาใส่ต่อใน products
        products = { list: [...products.list, newproducts] };
        //console.log(req.body.name);
        res.json(products);
        //res.send(products)
    });

//แก้ไข และ ลบ
router
    .route("/products/:products_id") //: => ... param
    //findIndex
    .get((req, res) => {
        let id = products.list.findIndex(
            (item) => item.id == +req.params.products_id
        );
        if (id >= 0) {
            res.json(products.list[id]);
        } else
            res.json("Can't get");
    })
        //แก้ไช
    .put((req, res) => {
        let id = products.list.findIndex(
            (item) => item.id == +req.params.products_id
        );
        //console.log(id);
        console.log("id = ", id);
        if (id == -1) {
            res.json("Can't Put");
        } else {
            products.list[id].name = req.body.name;
            products.list[id].price = req.body.price;
            products.list[id].amount = req.body.amount;
            res.json(products);
        }
    })

    .delete((req, res) => {
        const products_id = req.params.products_id;
        console.log("products: ", products_id);

        let id = products.list.findIndex(
            (item) => item.id == +req.params.products_id
        );
        if (id >= 0) {
            products.list = products.list.filter((item) => +item.id !== +products_id);
            //console.log(products.list);
            res.json(products.list);
        } else {
            res.json("Can't Delete");
        }
    });
app.listen(PORT, () => {
    console.log("Server running is port", PORT);
});
