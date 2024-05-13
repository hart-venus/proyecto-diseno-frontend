
import React, { useEffect } from 'react';

function AuthenticationChecker() {
    useEffect(() => {
        // Check if loggedIn
        try {
            const value = window.sessionStorage.getItem("USER_ID");
            if (value === null) {
                window.location.href = '/login';
            }
        } catch (e) {
            console.error("Error checking authentication:", e);
            window.location.href = '/login';
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div>
            {/* You can render any loading indicator or other content here */}
        </div>
    );
}

export default AuthenticationChecker;