import Database from "better-sqlite3";

const db = new Database("app_data.db");
console.log("Categories:");
console.log(db.prepare("SELECT * FROM categories").all());
console.log("\nDesigns:");
console.log(db.prepare("SELECT * FROM designs").all());
