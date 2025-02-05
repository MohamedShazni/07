const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Import mysql2

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'shazni07@mysql', // Your MySQL password
    database: 'ticketingSystem' // The name of your database
});

// Connect to the MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

let configuration = {
  totalTickets: 100,
  ticketReleaseRate: 5,
  customerRetrievalRate: 3,
  maxTicketCapacity: 200,
};

let systemStatus = {
  isRunning: false,
  currentTickets: 0,
  transactionLogs: [],
};

const logTransaction = (type, message) => {
  const timestamp = new Date().toLocaleTimeString();
  systemStatus.transactionLogs.push({ type, message, timestamp });

  const query = 'INSERT INTO transaction_logs (type, message, timestamp) VALUES (?, ?, ?)';
  db.query(query, [type, message, timestamp], (err) => {
    if (err) {
      console.error('Error inserting log into database:', err);
    }
  });

  if (systemStatus.transactionLogs.length > 20) {
    systemStatus.transactionLogs.shift(); // Keep the logs to a max of 20
  }
};

const saveSystemStatus = () => {
  const query = 'INSERT INTO system_status (totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, currentTickets, isRunning) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [
      configuration.totalTickets,
      configuration.ticketReleaseRate,
      configuration.customerRetrievalRate,
      configuration.maxTicketCapacity,
      systemStatus.currentTickets,
      systemStatus.isRunning
  ], (err) => {
      if (err) {
          console.error('Error saving system status to database:', err);
      }
  });
};


// Start the system
app.post('/start', (req, res) => {
  const { totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity } = req.body;

  if (totalTickets <= 0 || ticketReleaseRate <= 0 || customerRetrievalRate <= 0 || maxTicketCapacity < totalTickets) {
    return res.status(400).json({ error: 'Invalid configuration' });
  }

  configuration = { totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity };
  systemStatus = {
    isRunning: true,
    currentTickets: totalTickets,
    transactionLogs: [],
  };
  logTransaction('START', 'System started with initial configuration');
  saveSystemStatus();
  res.json({ message: 'System started', status: systemStatus });
});

// Stop the system
app.post('/stop', (req, res) => {
  systemStatus.isRunning = false;
  logTransaction('STOP', 'System stopped');
  saveSystemStatus();
  res.json({ message: 'System stopped', status: systemStatus });
});

// Get system status
app.get('/status', (req, res) => {
  res.json({ configuration, systemStatus });
});

app.get('/tickets', (req, res) => {
  db.query('SELECT * FROM tickets', (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Simulate ticket release and retrieval
app.post('/simulate', (req, res) => {
  if (!systemStatus.isRunning) {
    return res.status(400).json({ error: 'System is not running' });
  }

  const addedTickets = Math.min(
    configuration.ticketReleaseRate,
    configuration.maxTicketCapacity - systemStatus.currentTickets
  );
  const removedTickets = Math.min(
    configuration.customerRetrievalRate,
    systemStatus.currentTickets
  );

  systemStatus.currentTickets += addedTickets - removedTickets;

  if (addedTickets > 0) {
    logTransaction('ADD', `${addedTickets} tickets added to the pool`);
  }
  if (removedTickets > 0) {
    logTransaction('REMOVE', `${removedTickets} tickets retrieved by customers`);
  }

  res.json({ message: 'Simulation completed', status: systemStatus });
});

// Reset the system
app.post('/reset', (req, res) => {
  configuration = {
    totalTickets: 100,
    ticketReleaseRate: 5,
    customerRetrievalRate: 3,
    maxTicketCapacity: 200,
  };
  systemStatus = {
    isRunning: false,
    currentTickets: 0,
    transactionLogs: [],
  };
  saveSystemStatus();
  res.json({ message: 'System reset', status: systemStatus });
});

app.get('/latest-status', (req, res) => {
  const query = 'SELECT * FROM system_status ORDER BY createdAt DESC LIMIT 1';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching latest status from database:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length > 0) {
          const latestStatus = results[0];
          res.json({
              totalTickets: latestStatus.totalTickets,
              ticketReleaseRate: latestStatus.ticketReleaseRate,
              customerRetrievalRate: latestStatus.customerRetrievalRate,
              maxTicketCapacity: latestStatus.maxTicketCapacity,
              currentTickets: latestStatus.currentTickets,
              isRunning: latestStatus.isRunning,
          });
      } else {
          res.status(404).json({ error: 'No status found' });
      }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
