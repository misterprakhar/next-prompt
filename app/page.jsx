import Feed from "@components/Feed";

const Home = () => {
	return (
		<>
			<section className="w-full items-center flex flex-col">
				<h1 className="head_text text-center">
					Discover & Share
					<br className="max-md:hidden" />
					<span className="orange_gradient text-center">AI-Powered Prompts</span>
				</h1>
				<p className="desc text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis porro aperiam autem molestiae
					voluptatem et sunt doloribus. Reiciendis dignissimos architecto odit numquam, minima accusantium
					aliquam ducimus totam distinctio ab nostrum.
				</p>
			</section>
			<Feed />
		</>
	);
};

export default Home;
