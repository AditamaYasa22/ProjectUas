const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createDeleteSuccessResponse, createPostSuccessResponse, createSuccessResponse, createErrorResponse } = require("../response");

const table = "beli";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { idPembeli, idBarang, tglBeli, tglDiterima } = req.body;
  db.query(`INSERT INTO beli (idPembeli, idBarang, tglBeli, tglDiterima) VALUES (?, ?, ?, ?)`, [idPembeli, idBarang, tglBeli, tglDiterima], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({ idPembeli, idBarang, tglBeli, tglDiterima }));
  });
});

router.put("/:idBarang", (req, res) => {
  const idBarang = req.params.idBarang;
  const { idPembeli, tglBeli, tglDiterima } = req.body;
  db.query(`UPDATE beli SET idPembeli = ?, tglBeli = ?, tglDiterima = ? WHERE idBarang = ?`, [idPembeli, tglBeli, tglDiterima, idBarang], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPutSuccessResponse({ idPembeli, idBarang, tglBeli, tglDiterima }));
  });
});

router.get("/idPembeli", (req, res) => {
  db.query(`select idPembeli from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/tglBeli/:tglBeli", (req, res) => {
  const tglBeli = req.params.tglBeli;
  db.query(`select * from ${table} where tglBeli = ?`, [tglBeli], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/tglDiterima/:tglDiterima", (req, res) => {
  const tglDiterima = req.params.tglDiterima;
  db.query(`select * from ${table} where tglDiterima = ?`, [tglDiterima], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/idBarang/:idBarang", (req, res) => {
  const idBarang = req.params.idBarang;
  db.query(`select * from ${table} where idBarang= ?`, [idBarang], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
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