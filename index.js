const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello boss! Welcome the the simple-crud-server");
});

app.listen(port, () => {
    console.log(`Simple crud server is running on port ${port}`);
});