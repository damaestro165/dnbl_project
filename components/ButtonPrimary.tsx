import React from "react";

interface ButtonProps {
	width?: string;
	height?: string;
	label: string;
	onClick?: () => void;
}

const ButtonPrimary: React.FC<ButtonProps> = ({
	width,
	height,
	label,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			style={{ width, height }}
			className={`
				flex flex-col justify-center items-center py-4 px-6 gap-2 shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white transition duration-150 ease-in-out focus:bg-btn-gold w-full bg-btn-gold hover:translate-x-1`}
		>
			{label}
		</button>
	);
};

export default ButtonPrimary;
