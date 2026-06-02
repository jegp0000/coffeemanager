const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ===============================
// CONEXIÓN MONGO
// ===============================
const uri = "mongodb://coffeemanager:1995@ac-izfpkm1-shard-00-00.di8eg8z.mongodb.net:27017,ac-izfpkm1-shard-00-01.di8eg8z.mongodb.net:27017,ac-izfpkm1-shard-00-02.di8eg8z.mongodb.net:27017/tuDB?ssl=true&replicaSet=atlas-12jujh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

// ===============================
// MODELO
// ===============================
const Producto = mongoose.model("Producto", {
  nombre: String,
  categoria: String,
  stock: Number,
  precio: Number
});

// ===============================
// SEED (10 PRODUCTOS)
// ===============================
async function seedProductos() {
  const count = await Producto.countDocuments();

  if (count === 0) {
    await Producto.insertMany([
      { nombre: "Café Americano", categoria: "café", stock: 20, precio: 3000 },
      { nombre: "Cappuccino", categoria: "café", stock: 15, precio: 4500 },
      { nombre: "Latte", categoria: "café", stock: 18, precio: 5000 },
      { nombre: "Espresso", categoria: "café", stock: 25, precio: 2500 },
      { nombre: "Mocha", categoria: "café", stock: 10, precio: 5500 },
      { nombre: "Croissant", categoria: "panadería", stock: 12, precio: 4000 },
      { nombre: "Brownie", categoria: "postre", stock: 8, precio: 3500 },
      { nombre: "Té Negro", categoria: "bebida", stock: 14, precio: 2500 },
      { nombre: "Jugo Natural", categoria: "bebida", stock: 10, precio: 3500 },
      { nombre: "Galletas", categoria: "snack", stock: 30, precio: 1500 }
    ]);

    console.log("☕ Productos iniciales cargados");
  }
}

// ===============================
// RUTAS
// ===============================
app.get("/", (req, res) => {
  res.send("API Coffee Manager funcionando ☕");
});

app.get("/productos", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.post("/productos", async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.json(producto);
});

app.put("/productos/:id", async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(producto);
});

app.delete("/productos/:id", async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

// ===============================
// CONEXIÓN + SERVIDOR
// ===============================
mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Mongo conectado");
    await seedProductos();
  })
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("🚀 Servidor en http://localhost:3000");
});