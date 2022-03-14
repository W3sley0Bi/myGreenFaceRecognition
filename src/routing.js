const routing = (app)=>{
app.get("/", (req, res) => res.render("home"));
app.get("/recognitions", (req, res) => res.render("recognitions"));
app.get("/registration", (req, res) => res.render("registration"))

}

module.exports = routing