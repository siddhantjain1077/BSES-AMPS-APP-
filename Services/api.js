const BASE_URL = 'https://yourapi.com/api'; 

export const fetchCases = async () => {
  const response = await fetch(`${BASE_URL}/cases`);
  if (!response.ok) throw new Error('Failed to fetch case data');
  return response.json();
};

export const submitApprovalComment = async (orderNo, comment) => {
  const response = await fetch(`${BASE_URL}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNo, comment }),
  });
  return response.json();
};

export const submitRejection = async (orderNo, reason, comment) => {
  const response = await fetch(`${BASE_URL}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNo, reason, comment }),
  });
  return response.json();
};

export const submitTFRevisitComment = async (orderNo, comment) => {
  const response = await fetch(`${BASE_URL}/tf-revisit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNo, comment }),
  });
  return response.json();
};
