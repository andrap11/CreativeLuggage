var express = require("express"),
        app = express();

app.use(express.static(__dirname));
app.listen(parseInt(process.env.PORT) || 3010);