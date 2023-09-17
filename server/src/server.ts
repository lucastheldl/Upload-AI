import { app } from "./app";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { fastifyCors } from "@fastify/cors";

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);
app.register(fastifyCors, {
  origin: "*", //o ideal é por aqui o endereço do frontend
});

app
  .listen({
    //host: "0.0.0.0",
    port: 3333,
  })
  .then(() => console.log("Http server running"));
