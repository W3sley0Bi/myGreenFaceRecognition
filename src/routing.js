const routing = (app)=>{
app.get("/", (req, res) => res.render("home"));
app.get("/recognitions", (req, res) => res.render("recognitions"));
app.get("/registration", (req, res) => res.render("registration"))
app.get("/news", (req, res) => res.render("news"))
app.get("/theTeam", (req, res) => res.render("theTeam"))
app.get("/login100101", (req, res) => res.render("login"))
app.get("/dossier", (req, res) => res.render("dossier"))
}

module.exports = routing