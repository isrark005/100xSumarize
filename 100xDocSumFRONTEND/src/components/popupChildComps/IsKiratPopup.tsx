import { useState } from "react";
import InputBox from "../InputBox";

export function IsKiratPopup() {
    const [passwordValue, setPasswordValue] = useState('')

    const handleLogin = ()=> {
        
    }
    return (
        <div className="popup-inner-wrapper pb-6">
            <InputBox 
                type="password"
                label="Enter the password I sent you on Twitter from: isrark005"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.currentTarget.value)}
            />
            <button onClick={handleLogin} className="bg-blue-400 px-6 py-3 mt-3 text-white rounded-lg hover:bg-blue-700 transition">Let me in!</button>
        </div>
    )
}
