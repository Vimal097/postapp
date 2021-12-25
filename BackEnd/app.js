
require('dotenv').config();
const { Pool } = require("pg"); //Client removed as client will open and close new connection every time

const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  //password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT * FROM tbl_post");
  //console.log(now);
  await pool.end();

  return now;
}

// Connect with a client.

// async function clientDemo() {
//   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT NOW()");
//   await client.end();

//   return now;
// }

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log(poolResult.rows[0]);
  console.log("Time with pool: " + poolResult.rows[0]);//this shows object object beacuse here we are concating the string 
  //without actly converting the object into string first 

//   const clientResult = await clientDemo();
//   console.log("Time with client: " + clientResult.rows[0]["now"]);
})();