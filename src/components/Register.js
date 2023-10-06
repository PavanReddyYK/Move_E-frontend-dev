import axios from "axios";

const Register = () => {
  const SignUpGoogle = async () => {
    await axios
      .post(
        `http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/user/googleSignUp`
      )
      .then((res) => {
        window.location.href = `${res.data}`;
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

    return (
    <>
      <div className="container d-flex justify-content-center align-item-center">
        <h5>SignIn through google account??</h5>
        <button type="submit" onClick={SignUpGoogle}>
          SignIn
        </button>
      </div>
    </>
  );
};

export default Register;
