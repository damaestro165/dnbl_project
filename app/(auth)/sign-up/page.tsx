import Image from "next/image";

import RegisterForm from "@/components/RegisterForm";

function SignUp() {
	return (
		<section className="flex lg:min-h-screen items-center justify-center bg-white shrink-0">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white sm:p-5">
				<div className="max-lg:hidden relative rounded-3xl overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%]">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full w-auto object-cover bg-blend-multiply"
					/>
					<div className="absolute inset-0 bg-sign-in-layer"></div>
					<Image
						src="/assets/white-logo.png"
						alt="DNBL Fashion"
						width={196}
						height={88}
						className="max-xl:w-[26%] absolute top-7 left-4 md:left-[28px] z-10"
					/>
				</div>

				<RegisterForm />
			</div>
		</section>
	);
}

export default SignUp;
