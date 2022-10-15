const express = require('express');
const db = require('./models/index');

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

require('./routes/user_routes')(app);
require('./routes/book_routes')(app);
require('./routes/borrow_routes')(app);
require('./routes/return_routes')(app);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
