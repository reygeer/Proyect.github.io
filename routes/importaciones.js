const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM importaciones', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { producto, pais_origen, cantidad, fecha_importacion } = req.body;
  const query = 'INSERT INTO importaciones (producto, pais_origen, cantidad, fecha_importacion) VALUES (?, ?, ?, ?)';
  db.query(query, [producto, pais_origen, cantidad, fecha_importacion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { producto, pais_origen, cantidad, fecha_importacion } = req.body;
  const query = 'UPDATE importaciones SET producto = ?, pais_origen = ?, cantidad = ?, fecha_importacion = ? WHERE id = ?';
  db.query(query, [producto, pais_origen, cantidad, fecha_importacion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...req.body });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM importaciones WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Importación eliminada' });
  });
});

module.exports = router;
