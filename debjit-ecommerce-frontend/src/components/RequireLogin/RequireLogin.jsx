import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/empty-cart-login.png';

const RequireLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="max-w-md w-full">
        <img
          src={emptyCartImg}
          alt="Missing Cart Items"
          className="w-64 mx-auto mb-6 object-contain"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Missing Cart items?
        </h2>

        <p className="text-gray-500 mb-8">
          Login to see the items you added previously
        </p>

        <Link
          to="/signin"
          className="inline-block px-12 py-3 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RequireLogin;
