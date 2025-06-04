const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, correo_electronico, telefono, direccion } = req.body;
  const query = 'INSERT INTO clientes (nombre, correo_electronico, telefono, direccion) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, correo_electronico, telefono, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo_electronico, telefono, direccion } = req.body;
  const query = 'UPDATE clientes SET nombre = ?, correo_electronico = ?, telefono = ?, direccion = ? WHERE id = ?';
  db.query(query, [nombre, correo_electronico, telefono, direccion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...req.body });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente eliminado' });
  });
});

module.exports = router;
