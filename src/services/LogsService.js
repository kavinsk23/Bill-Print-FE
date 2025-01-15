import axios from 'axios';

const API_URL = `https://happysales.lk/api/v1/logs`;

const LogEntry = async (qrCode) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); 
    const URL = `${API_URL}/entry`;
    const response = await axios.post(
      URL,
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

const ExitEntry = async (qrCode) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); 
    const URL = `${API_URL}/exit`;
    const response = await axios.post(
      URL,
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

export { LogEntry, ExitEntry };
