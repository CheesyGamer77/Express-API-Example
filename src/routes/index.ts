import express from "express";
import UsersRoutes from "./users/UsersRoutes";

const app = express();
app.use(express.json());

new UsersRoutes(app);

app.listen(3000, () => {
    console.log("Server started");
})
