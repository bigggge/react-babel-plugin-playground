require('@babel/register')({
  presets: [
    "@babel/preset-env",
    ['@babel/preset-react', {
      "runtime": "automatic"
    }]
  ],
});

require("./jsx.js")
