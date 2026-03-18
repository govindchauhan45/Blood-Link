const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function init() {
  const db = await open({
    filename: path.join(__dirname, 'data.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS donors (
      id INTEGER PRIMARY KEY,
      name TEXT,
      bloodGroup TEXT,
      city TEXT,
      phone TEXT,
      lastDonation TEXT,
      available INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY,
      patientName TEXT,
      bloodGroup TEXT,
      city TEXT,
      phone TEXT,
      status TEXT DEFAULT 'open',
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      sender TEXT,
      text TEXT,
      time INTEGER
    );

    CREATE TABLE IF NOT EXISTS banks (
      id INTEGER PRIMARY KEY,
      name TEXT,
      lat REAL,
      lng REAL,
      city TEXT,
      phone TEXT
    );
  `);

  // Seed sample data if empty
  const donorsCount = await db.get('SELECT COUNT(1) as c FROM donors');
  if (donorsCount.c === 0) {
    const sample = [
      { name:"Ayush Shukla", bloodGroup:"A-", city:"Mumbai", phone:"+91 98201 11234", lastDonation:"2024-11-10", available:1 },
      { name:"Anadi Sharma", bloodGroup:"A+", city:"Delhi", phone:"+91 99101 22345", lastDonation:"2025-01-05", available:1 },
      { name:"Ankur Shukla", bloodGroup:"B+", city:"Bangalore", phone:"+91 97301 33456", lastDonation:"2025-02-14", available:0 },
      { name:"Ayush Tiwari", bloodGroup:"AB+", city:"Chennai", phone:"+91 96201 44567", lastDonation:"2024-10-20", available:1 },
      { name:"Ashutosh Tripathi", bloodGroup:"O+", city:"Mumbai", phone:"+91 95101 55678", lastDonation:"2025-01-28", available:0 },
      { name:"Govind Singh", bloodGroup:"O+", city:"Hyderabad", phone:"+91 94001 66789", lastDonation:"2024-09-15", available:1 },
      { name:"Vaibhav Dixit", bloodGroup:"B-", city:"Bangalore", phone:"+91 93201 77890", lastDonation:"2024-12-01", available:1 },
      { name:"Ankush Pal", bloodGroup:"AB-", city:"Pune", phone:"+91 92101 88901", lastDonation:"2024-08-20", available:1 },
      { name:"Atharva Gupta", bloodGroup:"A-", city:"Delhi", phone:"+91 91001 99012", lastDonation:"2025-01-10", available:1 },
      { name:"Vivek Gupta", bloodGroup:"A+", city:"Chennai", phone:"+91 90201 10123", lastDonation:"2025-02-20", available:0 }
    ];
    const insert = await db.prepare('INSERT INTO donors (name,bloodGroup,city,phone,lastDonation,available) VALUES (?,?,?,?,?,?)');
    for (const d of sample) await insert.run(d.name,d.bloodGroup,d.city,d.phone,d.lastDonation,d.available);
    await insert.finalize();
  }

  const banksCount = await db.get('SELECT COUNT(1) as c FROM banks');
  if (banksCount.c === 0) {
    const banks = [
      { name:"City Blood Bank - Mumbai", lat:19.0760, lng:72.8777, city:"Mumbai", phone:"+91 22 1234 5678" },
      { name:"Central Blood Bank - Delhi", lat:28.7041, lng:77.1025, city:"Delhi", phone:"+91 11 2345 6789" },
      { name:"Bangalore Blood Center", lat:12.9716, lng:77.5946, city:"Bangalore", phone:"+91 80 2345 6789" }
    ];
    const insb = await db.prepare('INSERT INTO banks (name,lat,lng,city,phone) VALUES (?,?,?,?,?)');
    for (const b of banks) await insb.run(b.name,b.lat,b.lng,b.city,b.phone);
    await insb.finalize();
  }

  const messagesCount = await db.get('SELECT COUNT(1) as c FROM messages');
  if (messagesCount.c === 0) {
    const insm = await db.prepare('INSERT INTO messages (sender,text,time) VALUES (?,?,?)');
    await insm.run('system','Welcome to BloodLink! Ask for help here.', Date.now()-60000);
    await insm.run('system','You can create emergency requests from the app.', Date.now()-30000);
    await insm.finalize();
  }

  return db;
}

module.exports = { init };
