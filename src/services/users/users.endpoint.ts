const BASE_USERS_URL = '/users';

const usersEndpoint = {
  users: BASE_USERS_URL,
  userById: (id: string) => `${BASE_USERS_URL}/${id}`,
  usersByEmail: (email: string) =>
    `${BASE_USERS_URL}?email=${encodeURIComponent(email)}`,
};

export default usersEndpoint;
