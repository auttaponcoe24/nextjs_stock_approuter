/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		dangerouslyAllowSVG: true,
		// domains: ["codemobiles.com", "pospos.co", "localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "codemobiles.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "pospos.co",
				pathname: "**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "ecklf.com",
				pathname: "**",
			},
		],
		minimumCacheTTL: 0,
	},
};

module.exports = nextConfig;
