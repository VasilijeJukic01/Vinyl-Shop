const express = require('express');
const path = require('path');
const app = express();

app.use( express.static( path.join(__dirname, 'static', 'dist') ) );

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
