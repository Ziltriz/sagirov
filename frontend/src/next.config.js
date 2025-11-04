/* eslint-disable import/extensions */
/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	output: 'standalone',
	// rewrites: async () => {
	// 	return [
	// 		{
	// 			source: '/healthz',
	// 			destination: '/api/health',
	// 		},
	// 		{
	// 			source: '/readyz',
	// 			destination: '/api/ready',
	// 		},
	// 	];
	// },
	// sentry: {
	// 	// See the sections below for information on the following options:
	// 	//   'Configure Source Maps':
	// 	//     - disableServerWebpackPlugin
	// 	//     - disableClientWebpackPlugin
	// 	//     - hideSourceMaps
	// 	//     - widenClientFileUpload
	// 	//   'Configure Legacy Browser Support':
	// 	//     - transpileClientSDK
	// 	//   'Configure Serverside Auto-instrumentation':
	// 	//     - autoInstrumentServerFunctions
	// 	//     - excludeServerRoutes
	// 	//   'Configure Tunneling to avoid Ad-Blockers':
	// 	//     - tunnelRoute
	// 	disableServerWebpackPlugin: true,
	// 	disableClientWebpackPlugin: true,
	// },
	reactStrictMode: false,
	// swcMinify: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles/')],
		// additionalData: `@use "abstract.scss" as *;`,
	},
	// images: {
	// 	domains: [`${process.env.NEXT_PUBLIC_IMAGE_URL}`],
	// }
	i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['ru'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'ru'
    }
};
// const sentryWebpackPluginOptions = {
// 	// Additional config options for the Sentry webpack plugin. Keep in mind that
// 	// the following options are set automatically, and overriding them is not
// 	// recommended:
// 	//   release, url, configFile, stripPrefix, urlPrefix, include, ignore

// 	org: 'oleg-chulakov-studio',
// 	project: 'vertical-frontend',

// 	// An auth token is required for uploading source maps.
// 	authToken: process.env.SENTRY_AUTH_TOKEN,

// 	silent: true, // Suppresses all logs

// 	// For all available options, see:
// 	// https://github.com/getsentry/sentry-webpack-plugin#options.
// };
// // module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// module.exports = withBundleAnalyzer(
// 	withSentryConfig(nextConfig, sentryWebpackPluginOptions),
// );

module.exports = {
	...nextConfig,
}

// =======
// module.exports = {
	// images: {
	//   remotePatterns: [
	// 	{
	// 	  protocol: 'https',
	// 	  hostname: 's3.timeweb.cloud/',
	// 	},
	//   ],
	// },
//   }