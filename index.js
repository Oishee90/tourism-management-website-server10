const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/',(req,res) => {
    res.send('making server is running')
})
app.listen(port, () => {
    console.log(`coffee server is running out ${port}`)
    
})