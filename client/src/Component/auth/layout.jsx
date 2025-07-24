import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left side: Welcome message */}
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight">Welcome to E-commerce Shopping</h1>
                </div>
            </div>

            {/* Right side: Login/Register will be displayed here */}
            <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
                <Outlet /> {/* ✅ This will render AuthLogin/AuthRegister */}
            </div>
        </div>
    );
}

export default AuthLayout;
