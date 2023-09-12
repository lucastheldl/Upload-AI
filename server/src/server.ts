import { fastify } from "fastify";

const app = fastify();

app.get("/", () => {
  return "hello world";
});

app
  .listen({
    //host: "0.0.0.0",
    port: 3333,
  })
  .then(() => console.log("Http server running"));
