/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ecklf.com",
				pathname: "**",
			},
		],
		minimumCacheTTL: 0,
	},
};

export default nextConfig;
