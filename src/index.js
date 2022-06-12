const express = require("express")
const productrouter = require("./routers/product")


const app = express()
const port = process.env.PORT || 3000

//use method for router
app.use(productrouter)


app.listen(port)