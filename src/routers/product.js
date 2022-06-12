const express = require("express")


const router = express.Router()
const { PrismaClient } = require("@prisma/client")

//to parse json data
router.use(express.json())

//prisma instanc
const prisma = new PrismaClient()


router.get("/product",async(req,res)=>{
    try{
        const product = await prisma.product.findMany({include:{category:true}})
        const category = await prisma.category.findMany({include:{products:true}})
        res.send({product,category})
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/product",async(req,res)=>{
    try{
        console.log(req.body)
        const data = req.body
        const product = await prisma.product.create({data:data})
        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("product/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const product = await prisma.product.findUnique({id})
        res.send(product)
    }catch(e){
        res.send(e)
    }
})


module.exports = router