const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MONGO
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo OK"))
.catch(err=>console.log(err));

// 📦 PRODUCTO
const Product = mongoose.model("Product", {
  nombre: String,
  stock: Number,
  precio: Number
});

// 🟢 SEED (20 PRODUCTOS)
async function seed(){
  const count = await Product.countDocuments();

  if(count === 0){
    await Product.insertMany([
      { nombre:"Espresso", stock:20, precio:2500 },
      { nombre:"Americano", stock:20, precio:3000 },
      { nombre:"Latte", stock:20, precio:5000 },
      { nombre:"Cappuccino", stock:20, precio:5500 },
      { nombre:"Mocha", stock:20, precio:6000 },
      { nombre:"Macchiato", stock:20, precio:4500 },
      { nombre:"Flat White", stock:20, precio:5200 },
      { nombre:"Cold Brew", stock:20, precio:6500 },
      { nombre:"Iced Latte", stock:20, precio:5800 },
      { nombre:"Affogato", stock:20, precio:7000 },
      { nombre:"Café con Leche", stock:20, precio:3500 },
      { nombre:"Café Negro", stock:20, precio:2500 },
      { nombre:"Caramel Latte", stock:20, precio:6200 },
      { nombre:"Vanilla Latte", stock:20, precio:6200 },
      { nombre:"Hazelnut Coffee", stock:20, precio:6500 },
      { nombre:"Irish Coffee", stock:20, precio:8000 },
      { nombre:"Cortado", stock:20, precio:3000 },
      { nombre:"Doppio", stock:20, precio:4000 },
      { nombre:"Ristretto", stock:20, precio:2800 },
      { nombre:"Turkish Coffee", stock:20, precio:7500 }
    ]);

    console.log("Seed listo");
  }
}

seed();

// 📦 GET
app.get("/products", async (req,res)=>{
  res.json(await Product.find());
});

// ➕ CREATE
app.post("/products", async (req,res)=>{
  res.json(await Product.create(req.body));
});

// ✏️ UPDATE
app.put("/products/:id", async (req,res)=>{
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new:true }));
});

// ❌ DELETE
app.delete("/products/:id", async (req,res)=>{
  res.json(await Product.findByIdAndDelete(req.params.id));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`RUN ${PORT}`);
});