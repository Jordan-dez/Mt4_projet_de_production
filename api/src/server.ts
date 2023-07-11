import Express from "express";
import { json } from "body-parser";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middlewares/errors-handler.middleware";
import { ROUTES_USER } from "./routes/user";
import { RegisterRoutes } from "./routes/routes";

const PORT = process.env.PORT || 3030;

const app = Express();
app.use(json());

RegisterRoutes(app);

app.use(Express.static("public"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);


app.use(errorHandler);

const start = () => {
    app.listen(PORT, () => {
        console.info("API Listening on port " + PORT);
    })
}

start();