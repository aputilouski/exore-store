export const prepareAuthHeaders = (headers: Headers) => {
  const token = localStorage.getItem('access-token');
  if (token) headers.set('authorization', `Bearer ${token}`);
  return headers;
};
