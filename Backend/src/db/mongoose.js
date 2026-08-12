const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


try {
    
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
// mongoose.connect("mongodb://localhost:27017/stable");
mongoose.connect(process.env.MONGODB_URL);

} catch (error) {
    console.log(error)
}