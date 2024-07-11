const axios = require('axios');
require('dotenv').config();

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'Mart',
      ownerName: 'Rahel',
      ownerEmail: 'rahul@abc.edu',
      accessCode: process.env.ACCESS_CODE
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.clientID && response.data.clientSecret) {
      console.log('Registration successful:', response.data);
      return {
        clientID: response.data.clientID,
        clientSecret: response.data.clientSecret
      };
    } else {
      console.error('Invalid registration response:', response.data);
      return {};
    }
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    return {};
  }
};

const authenticate = async (clientID, clientSecret) => {
  try {
    const response = await axios.post('http://20.244.56.144/test/auth', {
      companyName: 'Mart',
      clientID,
      clientSecret,
      ownerName: 'Rahel',
      ownerEmail: 'rahul@abc.edu',
      rollNo: process.env.ROLL_NO
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.access_token) {
      console.log('Authentication successful:', response.data);
      return {
        token_type: response.data.token_type,
        access_token: response.data.access_token,
        expires_in: response.data.expires_in
      };
    } else {
      console.error('Invalid authentication response:', response.data);
      return {};
    }
  } catch (error) {
    console.error('Error during authentication:', error.response ? error.response.data : error.message);
    return {};
  }
};

const main = async () => {
  const { clientID, clientSecret } = await register();
  if (clientID && clientSecret) {
    const { token_type, access_token, expires_in } = await authenticate(clientID, clientSecret);
    if (access_token) {
      console.log('Access Token:', access_token);
    } else {
      console.error('Failed to obtain access token.');
    }
  } else {
    console.error('Failed to register and obtain client credentials.');
  }
};

main();
