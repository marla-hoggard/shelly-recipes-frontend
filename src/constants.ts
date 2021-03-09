export const CATEGORIES = [
  'appetizer',
  'entree',
  'side',
  'dessert',
  'breakfast',
  'sauce',
  'beverage',
];

const getBackendURL = (env?: string) => {
  switch (env) {
    case 'local':
      return process.env.REACT_APP_BACKEND_BASE_URL_LOCAL;
    case 'ip':
      return process.env.REACT_APP_BACKEND_BASE_URL_IP;
    default:
      return process.env.REACT_APP_BACKEND_BASE_URL_PROD;
  }
};

export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || getBackendURL('local');
