if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

//libreries
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const nocache = require("nocache")
const path = require("path")


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []
app.use(nocache())
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


app.use(express.urlencoded({ extended: false }))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))
app.set('view engine', 'ejs');
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

)

app.post("/register", async (req, res) => {
    try {
        const existingUser = users.find(user => user.email === req.body.email);

        if (existingUser) {
            req.flash("error", "Email address already registered");
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        };

        users.push(newUser);
        console.log(users);
        res.redirect("/login");
    } catch (e) {
        console.log(e);
        req.flash("error", "Registration failed");
        res.redirect("/register");
    }
});


//Routes
app.get('/', (req, res) => {
    res.render("index.ejs", { name: req.isAuthenticated() ? req.user.name : null });
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})
app.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.get("*", (req, res) => {
    res
      .status(404)
      .render("error", { title: "Error!!!!", message: "Page not found" });
  });
//Routes End

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/login");
    });
});



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}



app.listen(3000)