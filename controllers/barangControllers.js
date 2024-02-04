const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createPostSuccessResponse, createDeleteSuccessResponse, createSuccessResponse, createErrorResponse } = require("../response");

const table = "barang";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { idBarang, namaBarang, tanggalProduksi, namaBrand } = req.body;
  if (!idBarang) {
    return res.status(400).json({ error: true, message: 'idBarang is required' });
  }
  db.query(`INSERT INTO barang (idBarang, namaBarang, tanggalProduksi, namaBrand) VALUES (?, ?, ?, ?)`, [idBarang, namaBarang, tanggalProduksi, namaBrand], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({ idBarang, namaBarang, tanggalProduksi, namaBrand }));
  });
});

router.get("/namaBarang", (req, res) => {
  db.query(`select namaBarang from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/idBarang/:idBarang", (req, res) => {
  const idBarang = req.params.idBarang;
  db.query(`select * from ${table} where idBarang = ?`, [idBarang], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/namaBrand/:namaBrand", (req, res) => {
  const namaBrand = req.params.namaBrand;
  db.query(`select * from ${table} where namaBrand = ?`, [namaBrand], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.put("/:idBarang", (req, res) => {
  const idBarang = req.params.idBarang;
  const { namaBarang, tanggalProduksi, namaBrand } = req.body;
  const table = "barang";
  db.query(`update ${table} set namaBarang = ?, tanggalProduksi = ?, namaBrand = ? where idBarang = ?`, [namaBarang, tanggalProduksi, namaBrand, idBarang], (err, result) => {
    if (err) {
      return res.status(500).json({error: true, message: err.message});
    }
    res.json(createPutSuccessResponse({ idBarang, namaBarang, tanggalProduksi, namaBrand }));
  });
});

router.delete("/:idBarang", (req, res) => {
  const idBarang = req.params.idBarang;
  db.query(`delete from ${table} where idBarang = ?`, [idBarang], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createDeleteSuccessResponse());
  });
});

module.exports = router;
