import axios from 'axios';

const API_URL = `https://happysales.lk/api/v1/logs/entry`;

const LogEntry = async (qrCode) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); 

    const response = await axios.post(
      API_URL,
      {},
      {
        params: { qrCode },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error posting log entry:', error);
    throw error;
  }
};

export default LogEntry;
