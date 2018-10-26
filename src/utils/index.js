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

export const shuffleOptions = options => {
  let ramdomized = [];
  let finished = false;

  while (!finished) {
    let index = Math.floor(Math.random() * 4);

    if (!ramdomized.some(r => r === index)) {
      ramdomized.push(index);
    }
    if (ramdomized.length === 4) {
      finished = true;
    }
  }
  return [...Array(4)].map((_, i) => options[ramdomized[i]]);
};
