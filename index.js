const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const authRoutes = require("./routes/auth")

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = 3001;

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err));

app.listen(PORT, ()=>{
    console.log(`Backend listening on PORT ${PORT}`);
})