const express = require('express');
const mysql = require('mysql')

const app = express();

const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const conn = mysql.createConnection(config)

const peopleName = [
  'Levi',
  'Fernanda',
  'Wesley',
  'Maria',
  'Willian',
  'Paulo',
  'Lucas',
  'Jesus',
  'Moises',
  'Messias',
  'Judas',
  'Jacoco',
  'Robin'
]

function insertPeopleInDb(name) {
  return `INSERT INTO people(name) VALUES ('${name}')`
}
const select = `SELECT p.name FROM people p`
let i = 0

app.get('/', async (req, res) => {

  await conn.query(insertPeopleInDb(peopleName[i++]))

  let people
  conn.query(select, await function (err, result, fields) {
    if (err) throw err
    people = result

    let peopleList = '<ul>';
    people.forEach(p => peopleList += `<li>${p.name}</li>`)
    peopleList += `</ul>`
    res.send('<h1>Full Cycle Rocks!</h1>' + peopleList.toString())
  })
});

app.listen(port, () => console.log('Running on port ' + port));
