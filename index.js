import app from "./app.js";
import {config} from "dotenv";
config();
const port = process.env.PORT;

import connectDb from "./app/config/db.js"


// server run
app.listen(port, async()=>{
    await connectDb()
    console.log(`Server run success on http://localhost:${port}`);
})