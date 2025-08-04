const Login = () => {
  return (
    <div>
      <h2>Employee Management System</h2>

      <form>
        <h2>Employee MS Login:</h2>
        <div>
          <label htmlFor="email">Enter your Email:</label>
          <input placeholder="Type your email here..." type="email" />
        </div>

        <div>
          <label htmlFor="password">Enter your Password:</label>
          <input placeholder="Type your password here..." type="password" />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
