import { app } from "./app";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);

app
  .listen({
    //host: "0.0.0.0",
    port: 3333,
  })
  .then(() => console.log("Http server running"));
