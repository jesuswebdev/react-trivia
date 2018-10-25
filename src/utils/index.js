export const getAuthState = () => {
  let user = JSON.parse(localStorage.getItem("userData"));
  if (!user) {
    return undefined;
  }
  return {
    user: {
      name: user.user.name,
      email: user.user.email,
      id: user.user.id,
      token: user.token
    }
  };
};
