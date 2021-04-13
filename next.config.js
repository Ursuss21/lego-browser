const nextEnv = require("next-env");
const path = require("path");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

module.exports = {
  withEnv: nextEnv(),
  sassOptions: {
    includePaths: [path.join(__dirname, "style")],
  },
};
