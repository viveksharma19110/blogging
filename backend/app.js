const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const client = require('./db/conn.js');
const cors = require('cors');



app.use(cors()); // to allow frontend API calls to backend we use this and to resolve the CORS error
app.use('/uploads', express.static('uploads'));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

app.post('/blog', async (req, res) => {
  try {
    const result = await client.query(
      'INSERT INTO blogs (title, image, post, category) VALUES ($1, $2, $3, $4)',
      [req.body.title, req.body.image, req.body.post, req.body.category]
    );
    res.json({ message: 'Added new blog', desc: result.rowCount });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/blog/:cat', async (req, res) => {
  const { cat } = req.params;

  try {
      let result;
      if (cat === 'all') {
          result = await pool.query('SELECT * FROM blogs');
      } else {
          result = await pool.query('SELECT * FROM blogs WHERE category = $1', [cat]);
      }
      res.json(result.rows);
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/', async (req, res) => {
//   try {
//       const result = await pool.query('SELECT * FROM blogs');
//       res.json(result.rows);
//   } catch (error) {
//       console.error('Error executing query', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get('/blogbyid/:id', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM blogs WHERE id = $1', [req.params.id]);
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});