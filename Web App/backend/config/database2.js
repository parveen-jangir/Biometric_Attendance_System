import mysql from "mysql2/promise";

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "BiometricAttendance",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default database;
// import mysql from "mysql2/promise";

// // Create a connection
// const connectToDatabase = async () => {
//   try {
//     const database = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "YourStr0ngP@ssw0rd!",
//       database: "BiometricAttendance",
//     });
//     console.log("Connected to MySQL database.");
//     return database;
//   } catch (err) {
//     console.error("Database connection failed:", err);
//     throw err;
//   }
// };

// // Export the connection
// let database;
// (async () => {
//   database = await connectToDatabase();
// })();

// export default database;