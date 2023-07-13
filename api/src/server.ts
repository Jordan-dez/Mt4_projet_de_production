import express from "express";
import { json } from "body-parser";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middlewares/errors-handler.middleware";
import { RegisterRoutes } from "./routes/routes";
import { requestLogMiddleware } from "./services/Logging/log.middleware";
import { JWTAuthHandler } from "./middlewares/auth.middleware";
import cors from "cors";

const PORT = process.env.PORT || 3030;

const app = express();
app.use(json());

app.use(requestLogMiddleware('req'));
app.use('/protected', JWTAuthHandler);

// Enable CORS
app.use(cors());

RegisterRoutes(app);

app.use(express.static("public"));
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
