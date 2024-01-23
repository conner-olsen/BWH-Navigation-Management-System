export function BasicLogin() {
    return (
        <form className="loginForm">
            <h1>Patient Login</h1>
            <div>
                <img src="../public/icon/user-icon.png"></img>
                <input type="text" id="username" name="username" placeholder="Username"/>
            </div>
            <div>
                <img src="../public/icon/password-icon.png"></img>
                <input type="password" id="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <input type="checkbox" id="remember" name="remmeber"/>
                <label>Remember me</label>
                <a href="">Forgot Password?</a>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default BasicLogin;
