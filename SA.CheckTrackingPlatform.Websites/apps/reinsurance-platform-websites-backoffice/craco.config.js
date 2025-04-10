const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, '../../packages/ui-kit'));
packages.push(
  path.join(__dirname, '../../packages/reinsurance-platform-websites-helpers'),
);
packages.push(
  path.join(__dirname, '../../packages/reinsurance-platform-websites-shared'),
);
module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};