import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber.js";
import { supportedChainIds, Tokens } from "@synapseprotocol/sdk";
import { default as Validator } from "fastest-validator";
import { BigNumber } from "ethers";

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    chainId: `The '{field}' field must be a valid chain in [${supportedChainIds()}]. Got: '{actual}'`,
    chainIdPairMismatch: `Expected field 'chainIdFrom' to be set with field 'chainIdTo'.`,
    notBignumberish: `The value '{actual}' in '{field}' is not a valid Bignumberish.`,
  },
});

const tokens = Object.keys(Tokens);
// Remove last 2 elems - the functions ['mintBurnTokens', 'isMintBurnToken']
// TODO: this WILL break if SDK changes.
if (tokens.pop() !== "isMintBurnToken" || tokens.pop() !== "mintBurnTokens")
  throw Error(`failed to clean tokens: [${tokens}]`);

v.alias("address", {
  type: "string",
  pattern: /^0x[a-fA-F0-9]{40}$/,
});

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
    if (Number(value) < 0) errors.push({ type: "numberPositive" });

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

const bridgeQuote = v.compile({
  chainIdFrom: "chainId",
  chainIdTo: "chainId",
  tokenTo: tokenChecker,
  tokenFrom: tokenChecker,
  amountFrom: bignumberChecker,
  addressTo: "address",
});

const bridgeTokens = v.compile({
  chainIdFrom: { type: "chainId", optional: true },
  chainIdTo: { type: "chainId", optional: true },
});

const swapQuote = v.compile({
  chainId: "chainId",
  tokenFrom: tokenChecker,
  tokenTo: tokenChecker,
  amountIn: bignumberChecker,
});

const swapTokens = v.compile({ chainId: "chainId" });

const schemas = {
  bridgeQuote,
  bridgeTokens,
  swapQuote,
  swapTokens,
};

/**
 * @param {object} data the data to validate
 * @param {string} schema the schema to validate data against
 * @returns {(true|ValidationError[])}
 */
const validateData = (data, schema) => schemas[schema](data);

export { validateData, v };
