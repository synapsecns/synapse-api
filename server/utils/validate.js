import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber.js";
import { supportedChainIds, Tokens } from "@synapseprotocol/sdk";
import { default as Validator } from "fastest-validator";
import { BigNumber } from "ethers";

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    chainId: `The '{field}' field must be a valid chain in [${supportedChainIds()}]. Got: '{actual}'`,
    notBignumberish: `The value '{actual}' in '{field}' is not a valid Bignumberish.`,
  },
});

const tokens = Object.keys(Tokens);
// Remove last 2 elems - the functions ['mintBurnTokens', 'isMintBurnToken']
// TODO: this WILL break if SDK changes.
if (tokens.pop() !== "isMintBurnToken" || tokens.pop() !== "mintBurnTokens")
  throw Error(`failed to clean tokens: [${tokens}]`);

v.add("chainId", function ({ schema, messages }, path, context) {
  return {
    source: `
          const chainId = Number(value);
          
          if (isNaN(chainId) || ![${supportedChainIds()}].includes(chainId))
            ${this.makeError({
              type: "chainId",
              actual: "value",
              messages,
            })}

          return chainId;
      `,
  };
});

const bignumberChecker = {
  type: "custom",
  check(value, errors, schema) {
    if (isBigNumberish(value)) value = BigNumber.from(value);
    else errors.push({ type: "notBignumberish", actual: value });

    return value;
  },
};

const tokenChecker = {
  type: "custom",
  check(value, errors, schema) {
    value = value.toUpperCase();

    if (!tokens.includes(value))
      errors.push({
        type: "enumValue",
        expected: schema.values,
        actual: value,
      });

    return Tokens[value];
  },
};

const swapQuote = v.compile({
  chainIdFrom: "chainId",
  chainIdTo: "chainId",
  tokenTo: tokenChecker,
  tokenFrom: tokenChecker,
  amountFrom: bignumberChecker,
});

const schemas = {
  swapQuote,
};

/**
 * @param {object} data the data to validate
 * @param {string} schema the schema to validate data against
 * @returns {(true|ValidationError[])}
 */
const validateData = (data, schema) => schemas[schema](data);

export { validateData };
