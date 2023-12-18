import React, { useState } from "react";
import "./ForgotPage.css";

function ForgotPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordOrNot = () => {
		setShowPassword(!showPassword);
	};
    const handleNext = (e) => {
        e.preventDefault();

        if(step === 1) {

            setStep(2);
        } else if(step === 2) {

        }
    };


    return(
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <img src={`/images/forgot-password.png`} alt={"forgot-pass"} className="forgot-password-image"/>
                <div className="submit-form">
                    {step === 1 && (
                        <>
                            <h1>Forgot Password?</h1>
                            <p>Enter the username associated with your account.</p>
                            <form onSubmit={handleNext}>
                                <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="next-button">Next</button>
                            </div>
                        </form>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h1>Reset Password</h1>
                            <p>Enter your new password.</p>
                            <form onSubmit={handleNext}>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <img
                                        src={showPassword ? "/images/show.png" : "/images/hide.png"}
                                        alt="Show password"
                                        onClick={showPasswordOrNot}
                                        className="password"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="next-button">Set New Password</button>
                                </div>
                            </form>
                        </>
                    )}
                </div>


            </div>
        </div>
    );
}
export default ForgotPage;