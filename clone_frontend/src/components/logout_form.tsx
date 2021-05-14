import {logOut} from '../js_functions/login';

const LogoutForm = () => {

  const handleOnClick = () => {
    logOut();
  };

    return (
      <button onClick={handleOnClick}>Logout</button>
    );


}

export default LogoutForm;