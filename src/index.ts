import express from "express";
import mongodb from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());//handle CORS
app.use(bodyParser.json());//parse request and expose on request.body

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

router.route("/ips/add").post((req, res) => {
    client.db("myTest").collection("ips").insertOne(req.body)
        .then(() => {
            res.status(200).json({ ip: "Added successfully" });
        })
        .catch((err) => {
            res.status(400).send("Failed to create new record");
        });
});

// router.route("/ips").get((req, res) => {
//     Ip.find((err, ips) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(ips);
//         }

//     });
// });
// app.get('/', cors(), (req, res) => {
//     res.send({ msg: "hello" });
// })

app.use("/", router);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Express server started at http://localhost:${port}`);
});
