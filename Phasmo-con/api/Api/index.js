const express = require('express');
const cors = require('cors');

const app = express();

const rutasUsuarios = require('./src/routes/crud');
const rutasItems = require('./src/routes/productos');
const rutasMatchHistory = require('./src/routes/matchHistory');
const rutasAuth = require('./src/routes/auth');
const authController = require('./src/controller/auth');

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/api/usuarios", rutasUsuarios);
console.log("mounted /api/usuarios");
app.use("/api/users", rutasUsuarios);
console.log("mounted /api/users");
app.use("/api/productos", rutasItems);
console.log("mounted /api/productos");
app.use("/api/items", rutasItems);
console.log("mounted /api/items");
app.use("/api/match-history", rutasMatchHistory);
console.log("mounted /api/match-history");
app.use("/api/auth", rutasAuth);
console.log("mounted /api/auth");
app.post("/api/auth/login", authController.login);
console.log("mounted /api/auth/login direct");
app.post("/ping", (req, res) => res.json({ ok: true }));
console.log("mounted /ping");
app.get("/api/auth/login-test", (_req, res) => res.json({ ok: true, test: true }));
console.log("mounted /api/auth/login-test");
app.get("/api/health", (_req, res) => res.json({ ok: true, t: Date.now() }));
console.log("mounted /api/health");

const listRoutes = () => {
    const routes = [];
    const stack = app._router?.stack || [];
    stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({ path: middleware.route.path, methods: Object.keys(middleware.route.methods) });
        } else if (middleware.name === 'router' && middleware.handle.stack) {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({ path: handler.route.path, methods: Object.keys(handler.route.methods) });
                }
            });
        }
    });
    console.log("Registered routes:", routes);
};

app.listen(3000, () => {
    console.log("listening on port 3000");
    listRoutes();
});

app.use((req, res) => {
    console.log(`404 handler reached for ${req.method} ${req.url}`);
    res.status(404).json({ error: "Not Found", path: req.url });
});
