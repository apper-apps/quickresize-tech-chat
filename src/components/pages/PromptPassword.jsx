import { useEffect } from 'react';

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showPromptPassword('#authentication-prompt-password');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="flex-1 py-12 px-5 flex justify-center items-center max-w-md">
                <div id="authentication-prompt-password" className="bg-white mx-auto w-full p-10 rounded-2xl shadow-lg border border-gray-200"></div>
            </div>
        </div>
    );
};

export default PromptPassword;