var app = require("../app"); //Require our app
var keypress = require("keypress");

keypress(process.stdin);

app.set("port", process.env.PORT || 8000);


var server = app.listen(app.get("port"), function() {
    console.log("Express server listening on port " + server.address().port);
});
