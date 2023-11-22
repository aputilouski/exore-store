export const saveAccessToken = (token: string) => {
  localStorage.setItem('access-token', token);
};

export const findAccessToken = () => {
  return localStorage.getItem('access-token');
};

export const destroyAccessToken = () => {
  localStorage.removeItem('access-token');
};
