import React from 'react';

interface ButtonProps {
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = '#919191', // Default color
  label,
  onClick,
  loading,
}) => {
  return (
    <button
      disabled={loading}
      aria-disabled={loading}
      onClick={onClick}
      style={{ backgroundColor }}
      className={`flex flex-col justify-center items-center py-4 px-6 gap-2 shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white transition duration-300 ease-in-out hover:bg-btn-gold focus:bg-btn-gold w-full ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
