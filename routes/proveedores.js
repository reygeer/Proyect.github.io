const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, email, telefono, rfc, direccion } = req.body;
  const query = 'INSERT INTO proveedores (nombre, email, telefono, rfc, direccion) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, email, telefono, rfc, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, rfc, direccion } = req.body;
  const query = 'UPDATE proveedores SET nombre = ?, email = ?, telefono = ?, rfc = ?, direccion = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, rfc, direccion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...req.body });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM proveedores WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Proveedor eliminado' });
  });
});

module.exports = router;
