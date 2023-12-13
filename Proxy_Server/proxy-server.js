const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

// Proxy endpoint for the login request
app.post('/login', async (req, res) => {
  try {
    const response = await axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Proxy endpoint for retrieving the customer list
app.get('/get_customer_list', async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', ''); // Extract the token from the Authorization header

  try {
    const response = await axios.get('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', {
      params: { cmd: 'get_customer_list' },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Proxy endpoint for deleting the customer
app.post('/delete_customer', async (req, res) => {
  try {
    const { cmd, uuid } = req.query; // Accessing parameters from query instead of body
    console.log(cmd);
    console.log(uuid);
    const token = req.headers.authorization.replace('Bearer ', '');

    // Make a request to the target server
    const response = await axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', null, {
      params: {
        cmd: cmd,
        uuid: uuid,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Forwarding the response from the target server
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Proxy endpoint for adding customer details
app.post('/create_customer', async (req, res) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    const customerDetails = req.body;
    console.log("customer Details : ",customerDetails);
    // Forwarding the request to the target server
    const response = await axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', customerDetails, {
      params: {
        cmd: 'create'
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Forwarding the response from the target server
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Proxy endpoint for updating the customer details
app.post('/update_customer', async (req, res) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    const customerDetails = req.body;
    console.log("Customer Details to be Updated : ", customerDetails);

    // Extracting cmd and uuid from the request body
    const { cmd, uuid } = customerDetails;

    // Removing cmd and uuid from customerDetails 
    delete customerDetails.cmd;
    delete customerDetails.uuid;

    // Forwarding the request to the target server
    const response = await axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', customerDetails, {
      params: { cmd : cmd, uuid : uuid }, 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Forwarding the response from the target server
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Proxy Server running on http://localhost:${PORT}`);
});
