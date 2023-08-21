import { app } from "./config/application.js";
import { prismaClient } from "./config/database.js";
// import { createManyContact } from "./iterasi-contact.js";

async function connectDatabase() {
  try {
    await prismaClient.$connect();
    console.log("Database Connect");
  } catch (error) {
    console.log("Database terputus" + error);
  }
}
connectDatabase();

app.listen(2000, () => {
  console.log("Server Up And Running In Port 2000");
});
