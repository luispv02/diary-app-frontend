import { Outlet } from "react-router";

export const AuthLayout = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};