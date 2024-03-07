const exp = require('express');
const db = require('../context/connection')
const app = exp();
const port = 3100;
const resp = require('../response/response')
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(bodyparser.json());


app.use(cors());

app.post('/user/getUserId', (req, res) => {
  const { intUserId } = req.body;
  const sql = `select * from user where intUserId = ${intUserId}`;
  db.query(sql, (error, result) => {
    resp(200, result, "berhasil harusnya", res);
  })
});
app.post('/user/absen', (req, res) => {
  const { intUserId } = req.body;
  const sql = `insert into kehadiran (intUserId, dtmJamDatang) values (${intUserId}, CURRENT_TIMESTAMP());`;
  db.query(sql, (error, result) => {
    resp(200, result, "berhasil harusnya", res);
  })
});

app.post('/user/login', (req, res) => {
  const { txtEmail, txtPassword } = req.body;
  const sql = `SELECT * FROM USER as usr JOIN account as acc on usr.intUserId = acc.intUserId where usr.txtEmail = '${txtEmail}' and acc.txtPassword = '${txtPassword}';`;
  db.query(sql, (error, result) => {
    resp(200, result, "berhasil harusnya", res);
  })
});

app.get('/HR/getUser', (request, response) => {
    db.query("SELECT usr.*, acc.txtPassword FROM USER as usr JOIN account as acc on usr.intUserId = acc.intUserId;", (error, result) => {
        resp(200, result, "berhasil harusnya", response);
    })
})

app.post('/HR/SaveUser', (request, res) =>{
    const { txtName, txtEmail, txtNomorHP, txtRole} = request.body;
    console.log(request.body);

    // Query SQL untuk menyimpan data ke tabel user
    const sqlUser = `INSERT INTO user (txtName, txtEmail, txtNomorHP, txtRole) 
                     VALUES ('${txtName}', '${txtEmail}', '${txtNomorHP}', '${txtRole}')`;
    
    // Query SQL untuk menyimpan data ke tabel account
    const sqlAccount = `INSERT INTO account (intUserId, txtPassword) 
                        VALUES (LAST_INSERT_ID(), 'admin')`;
  
    // Jalankan transaksi SQL
    db.beginTransaction((err, result) => {
      if (err) {
        throw err;
      }
  
      // Lakukan insert ke tabel user
      db.query(sqlUser, (err) => {
        if (err) {
          return db.rollback(() => {
            throw err;
          });
        }
   
        db.query(sqlAccount, err => {
          if (err) {
            return db.rollback(() => {
              throw err;
            });
          }
  
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                throw err;
              });
            }
            console.log('Data inserted successfully');
            resp(200, result, "berhasil harusnya", res);
          });
        });
      });
    });
})

app.post('/user/Update', (request, res) =>{
  const { intUserId, txtPassword, txtNomorHP } = request.body;
  // Query SQL untuk menyimpan data ke tabel account
  const sqlpassword = `update account set txtPassword = '${txtPassword}' where intUserId = ${intUserId}`;
  const sqlalamat = `update user set txtNomorHP = '${txtNomorHP}' where intUserId = ${intUserId}`;

  // Jalankan transaksi SQL
  db.beginTransaction((err, result) => {
    if (err) {
      throw err;
    }

    // Lakukan insert ke tabel user
 
      db.query(sqlpassword, err => {
        if (err) {
          return db.rollback(() => {
            throw err;
          });
        }
        db.query(sqlalamat, err => {
          if (err) {
            return db.rollback(() => {
              throw err;
            });
          }
        });
      });

      
      

      db.commit(err => {
        if (err) {
          return db.rollback(() => {
            throw err;
          });
        }
        console.log('Data inserted successfully');
        resp(200, result, "berhasil harusnya", res);
      });
    
  });
})

app.listen(port, () => {
    console.log(`ini port ${port}`)
})
