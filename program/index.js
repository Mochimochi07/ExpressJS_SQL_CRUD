const express = require('express');
const mysql = require('mysql');


const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pokemon'
});


connection.connect();


app.get('/pokemon', (req, res) => {

  connection.query('SELECT * FROM pokemon', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/pokemon/:id', (req, res) => {

  connection.query('SELECT * FROM pokemon WHERE id = ?', [req.params.id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

app.post('/pokemon', (req, res) => {
 
  const pokemon = req.body;
  connection.query('INSERT INTO pokemon SET ?', pokemon, (error) => {
    if (error) throw error;
    res.send({ message: 'Pokemon added successfully' });
  });
});

app.put('/pokemon/:id', (req, res) => {
  
  const pokemon = req.body;
  connection.query('UPDATE pokemon SET ? WHERE id = ?', [pokemon, req.params.id], (error) => {
    if (error) throw error;
    res.send({ message: 'Pokemon updated successfully' });
  });
});

app.delete('/pokemon/:id', (req, res) => {
 
  connection.query('DELETE FROM pokemon WHERE id = ?', [req.params.id], (error) => {
    if (error) throw error;
    res.send({ message: 'Pokemon deleted successfully' });
  });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
