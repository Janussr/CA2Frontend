const URL = "http://localhost:8080/CA2_war_exploded";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const login = (user, password, setLoggedIn, setErrorMessage) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setLoggedIn(true);
        setErrorMessage(" logged in ");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const hasUserAccess = (neededRole) => {
    const roles = getUserRoles().split(",");
    console.log(roles);

    return roles.includes(neededRole);
  };

  const fetchData = (info) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/user/" + info, options).then(handleHttpErrors);
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUserRoles,
    hasUserAccess,
  };
}
const facade = apiFacade();
export default facade;
