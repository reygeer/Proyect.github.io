const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM cotizaciones', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre_cliente, producto_servicio, cantidad, precio_unitario } = req.body;
  const query = 'INSERT INTO cotizaciones (nombre_cliente, producto_servicio, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre_cliente, producto_servicio, cantidad, precio_unitario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_cliente, producto_servicio, cantidad, precio_unitario } = req.body;
  const query = 'UPDATE cotizaciones SET nombre_cliente = ?, producto_servicio = ?, cantidad = ?, precio_unitario = ? WHERE id = ?';
  db.query(query, [nombre_cliente, producto_servicio, cantidad, precio_unitario, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...req.body });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cotizaciones WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cotización eliminada' });
  });
});

module.exports = router;
