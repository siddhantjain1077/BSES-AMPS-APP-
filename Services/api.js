// Import AsyncStorage to retrieve stored auth token
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API URL for all endpoints
const BASE_URL = 'https://test.bsesbrpl.co.in/AMPS_APP';

// ✅ All Endpoint URLs
export const LOGIN_URL = `${BASE_URL}/api/Auth/login`;                               // Login endpoint
export const PENDING_LIST_URL = `${BASE_URL}/api/AMPS/PendingCaseList`;              // Fetch pending cases
export const VIEW_PENDING_URL = `${BASE_URL}/api/AMPS/ViewPendingOrder_16062025`;    // View details of a pending case
export const DROPDOWN_LIST_URL = `${BASE_URL}/api/AMPS/DeficiencyListMST`;           // Fetch list of deficiency reasons
export const COMPLETED_CASE_URL = `${BASE_URL}/api/AMPS/AMPSActionCompletedCaseList`; // Submit completed case
export const TF_ENG_LIST_URL = `${BASE_URL}/api/AMPS/TfEngineerByDivision`;          // Fetch TF engineers list by division
export const TF_REVISIT_SUBMIT_URL = `${BASE_URL}/api/AMPS/TFRevisitSubmit`;         // Submit TF revisit request
export const FORGET_PASSWORD = `${BASE_URL}/api/Auth/ChangePassword`;          // Change password endpoint
export const ARAActions = `${BASE_URL}/api/AMPS/AMPSAction_30042025`; // Fetch ARA actions
export const historyLogs = `${BASE_URL}/api/AMPS/OrderWebsiteStatusLog`; // Fetch history logs
// ✅ POST request helper function

export const postRequest = async (url, payload) => {
  try {
    // Get stored token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Define headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Log request details for debugging
    console.log('[🌐 POST] URL:', url);
    console.log('[🛂 Token]', token);
    console.log('[📦 Payload]', payload);

    // Perform the POST request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // If response is not OK, throw error with detailed info
    if (!response.ok) {
      const errorText = await response.text(); // extract error message
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Parse and return the response JSON
    const data = await response.json();
    console.log('[✅ Response]', data);
    return data;

  } catch (error) {
    // Log and propagate any error encountered during request
    console.error('API error:', error.message);
    throw error;
  }
};
