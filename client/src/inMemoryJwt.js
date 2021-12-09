const inMemoryJWTManager = () => {
  let inMemoryJWT = window.localStorage.getItem("token") ?? null;
  let parsedToken = null;

  const getToken = () => inMemoryJWT;

  const getParsedToken = () => {
    if (inMemoryJWT && !parsedToken) {
      const base64Payload = inMemoryJWT.split(".")[1];
      parsedToken = JSON.parse(window.atob(base64Payload));
    }
    return parsedToken;
  };

  const setToken = (token) => {
    inMemoryJWT = token;
    window.localStorage.setItem("token", token);
  };

  const ereaseToken = () => {
    inMemoryJWT = null;
    parsedToken = null;
    window.localStorage.removeItem("token");
  };

  return {
    ereaseToken,
    getParsedToken,
    getToken,
    setToken,
  };
};

export default inMemoryJWTManager();
