import express from "express";
//import Ip from "../models/ip";
import mongodb from "mongodb";

const app = express();
const port = 4000; // default port to listen
const router = express.Router();

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-ek1ok.mongodb.net/myTest?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

client.connect().then(c => {
    c.db("myTest").collection("ips").find().toArray().then(r => {
        console.log(r);
    });
})

// client.connect(err => {
//     const collection = client.db("myTest").collection("ips").find().toArray().then(r => {
//         alert(r);
//     });
//     // perform actions on the collection object
//     client.close();
// });

// router.route("/ips/add").post((req, res) => {
//     const ip = new Ip(req.body);
//     ip.save()
//         .then(() => {
//             res.status(200).json({ ip: "Added successfully" });
//         })
//         .catch((err) => {
//             res.status(400).send("Failed to create new record");
//         });
// });

// router.route("/ips").get((req, res) => {
//     Ip.find((err, ips) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(ips);
//         }

//     });
// });
app.get('/', (req, res) => {
    res.send('HEY!');
})

app.use("/", router);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Express server started at http://localhost:${port}`);
});
