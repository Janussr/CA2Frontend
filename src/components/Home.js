import Login from "./Login";
import LoggedIn from "./LoggedIn";

function Home(props) {
  const {
    loggedIn,
    login,
    logout,
    errorMessage,
    setErrorMessage,
    setLoggedIn,
  } = props;
  return (
    <div>
      <h4> {errorMessage}</h4>
      {!loggedIn ? (
        <Login login={login} />
      ) : (
        <div>
          <LoggedIn
            setLoggedIn={setLoggedIn}
            setErrorMessage={setErrorMessage}
          />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default Home;
