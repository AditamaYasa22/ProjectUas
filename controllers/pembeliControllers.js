const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createPostSuccessResponse, createDeleteSuccessResponse, createSuccessResponse, createErrorResponse } = require("../response");

const table = "pembeli";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { idPembeli, namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp } = req.body;
  db.query(`INSERT INTO pembeli (idPembeli, namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [idPembeli, namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp ], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({idPembeli, namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp }));
  });
});

router.get("/tempatLahir", (req, res) => {
  db.query(`select tempatLahir from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/namaPembeli/:namaPembeli", (req, res) => {
  const namaPembeli = req.params.namaPembeli;
  db.query(`select * from ${table} where namaPembeli = ?`, [namaPembeli], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.put("/:idPembeli", (req, res) => {
  const idPembeli = req.params.idPembeli;
  const { namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp } = req.body;
  db.query(`UPDATE pembeli SET namaPembeli = ?, tempatLahir = ?, tglLahir = ?, gender = ?, alamat = ?, noTelp = ? where idPembeli = ?`, [namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp, idPembeli], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPutSuccessResponse({ idPembeli, namaPembeli, tempatLahir, tglLahir, gender, alamat, noTelp }));
  });
});

router.delete("/:tglLahir", (req, res) => {
  const tglLahir = req.params.tglLahir;
  db.query(`delete from ${table} where tglLahir = ?`, [tglLahir], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createDeleteSuccessResponse());
  });
});

module.exports = router;