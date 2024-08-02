import Elysia from "elysia";

new Elysia()
  .get("/", () => "hello world")
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
