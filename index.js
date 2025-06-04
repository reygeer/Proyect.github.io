const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/importaciones', require('./routes/importaciones'));
app.use('/api/cotizaciones', require('./routes/cotizaciones'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
