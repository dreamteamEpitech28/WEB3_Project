import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: ["contract/**", "phygital/**"],
  },
];

export default config;


