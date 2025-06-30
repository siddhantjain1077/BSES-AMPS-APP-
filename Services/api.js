const BASE_URL = 'https://test.bsesbrpl.co.in/AMPS_APP';

export const LOGIN_URL = `${BASE_URL}/api/Auth/login`;
export const PENDING_LIST_URL = `${BASE_URL}/api/AMPS/PendingCaseList`;
export const VIEW_PENDING_URL = `${BASE_URL}/api/AMPS/ViewPendingOrder_16062025`;
export const DROPDOWN_LIST_URL = `${BASE_URL}/api/AMPS/DeficiencyListMST`;
export const COMPLETED_CASE_URL = `${BASE_URL}/api/AMPS/AMPSActionCompletedCaseList`;
export const TF_ENG_LIST_URL = `${BASE_URL}/api/AMPS/TfEngineerByDivision`;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postRequest = async (url, payload) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('[FETCH] Token:', token);
    console.log('[FETCH] Request to:', url);
    console.log('[FETCH] Headers:', headers);
    console.log('[FETCH] Payload:', payload);

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text(); 
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
};
