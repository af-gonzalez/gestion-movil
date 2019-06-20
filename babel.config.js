module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "alias": {
            "@components": "./src/app/components",
            "@screens": "./src/app/screens",
            "@constants": "./src/config/constants",
            "@store": "./src/store",
            "@graphql": "./src/graphql"
          }
        }
      ]
    ]
  };
};
