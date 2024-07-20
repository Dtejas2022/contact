const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the data
const dataSchema = new mongoose.Schema({
  field: String
});

// Create a model for the data
const Data = mongoose.model('Data', dataSchema);

// Create an API endpoint to store the data
app.post('/api/store', (req, res) => {
  const { field } = req.body;
  const data = new Data({ field });
  data.save((err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error storing data' });
    } else {
      res.send({ message: 'Data stored successfully' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});