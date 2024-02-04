const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./connection/db");
const bodyParser = require("body-parser");
const adminAuth = require("./middleware/admin");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const barangControllers= require("./controllers/barangControllers");
const beliControllers = require("./controllers/beliControllers");
const pembeliControllers = require("./controllers/pembeliControllers");

app.use("/api/barang", barangControllers);
app.use("/api/beli", beliControllers);
app.use("/api/pembeli", pembeliControllers);

app.get("/", (req, res) => {
  res.json({
    autor: "Code dibuat oleh Aditama, Bintang, dan Ditia",
    path: {
      barang: ["GET /api/barang", "GET /api/barang/namaBarang", "GET /api/barang/idBarang/:idBarang", "GET /api/barang/namaBrand/:namaBrand",  "PUT /api/:idBarang", "POST /api/barang", "DELETE /api/barang/:idBarang"],
      beli: ["GET /api/beli", "GET /api/beli/idPembeli", "GET /api/beli/tglBeli/:tglBeli", "GET / api/beli/tglDiterima/:tglDiterima", "GET / api/beli/idBarang/:idBarang", "PUT /api/beli/:idBarang", "POST /api/beli", "DELETE /api/beli/:idBarang"],
      pembeli: [ "GET /api/pembeli", "GET /api/pembeli/tempatLahir", "GET /api/pembeli/namaPembeli/:namaPembeli","PUT /api/pembeli/:idPembeli", "POST /api/pembeli", "DELETE /api/pembeli/:tglLahir",
      ],
    },
  });
});

app.get("/admin", adminAuth, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = { username: "admin", password: "admin" };
  if (username === user.username && password === user.password) {
    const token = jwt.sign(user, "secret-key");
    res.json({ token });
  }
  res.json({ message: "kamu tidak dapat akses" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});