"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
		<nav className="flex justify-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 ">
				<Image src="/assets/images/logo.svg" width={30} height={30} className="object-contain" alt="logo" />
				<p className="logo_text">Proompter</p>
			</Link>

			{/*desktop navigation*/}

			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button className="outline_btn" type="button" onClick={signOut}>
							Sign Out
						</button>
						<Link href="/profile">
							<Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="user_image" />
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* mobile navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className="rounded-full"
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
							alt="user_image"
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
