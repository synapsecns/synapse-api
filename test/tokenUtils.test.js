import * as TokenUtils from "../server/utils/tokenUtils.js";
import chai from "chai"
import chaiSubset from "chai-subset"

chai.use(chaiSubset);

const expect = chai.expect;
const should = chai.should();

describe('TokenUtils unit tests', () => {

    it('getSymbols() should return list of supported token symbols', function () {
        let res = TokenUtils.getSymbols();
        res.should.be.an('array');

        let symbolsSample = ["DAI", "USDC", "USDC", "AVAX"]
        expect(res).containSubset(symbolsSample);

        let cachedRes = TokenUtils.getSymbols();
        res.should.equal(cachedRes);
    });

    it('getAddresses() should return list of supported token addresses across chains', function () {
        let res = TokenUtils.getAddresses();
        res.should.be.an('array');

        // Random sample of addresses across chains
        let addressSubsetSample = [
            "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
            "0x565098CBa693b3325f9fe01D41b7A1cd792Abab1",
            "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"
        ]
        expect(res).containSubset(addressSubsetSample);

        let cachedRes = TokenUtils.getAddresses();
        res.should.equal(cachedRes);
    });

    it('getObjects() should return list of token objects', function () {
        let res = TokenUtils.getObjects();
        res.should.be.an('array');
        res[0].should.be.an('object');

        res[0].should.have.property('name');
        res[0].should.have.property('symbol');
        res[0].should.have.property('decimals');
        res[0].should.have.property('addresses');
        res[0].should.have.property('swapType');

        let cachedRes = TokenUtils.getObjects();
        res.should.equal(cachedRes);
    });

    it('getObjectFromSymbol() should return a token object when a token symbol is passed as param', function () {
        let res = TokenUtils.getObjectFromSymbol("DAI");
        res.should.be.an('object');
        res.should.have.property('symbol');
        res.symbol.should.equal("DAI");

        res.should.have.property('name');
        res.should.have.property('decimals');
        res.should.have.property('addresses');
        res.should.have.property('swapType');

        let cachedRes = TokenUtils.getObjectFromSymbol("DAI");
        res.should.equal(cachedRes);
    });

    it('getObjectFromAddress() should return a token object when a token symbol is passed as param', function () {
        let address = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" // USDT on Polygon
        let res = TokenUtils.getObjectFromAddress(address);
        res.should.be.an('object');
        res.should.have.property('symbol');
        res.symbol.should.equal("USDT");

        res.should.have.property('name');
        res.should.have.property('decimals');
        res.should.have.property('addresses');
        res.should.have.property('swapType');

        let cachedRes = TokenUtils.getObjectFromAddress(address);
        res.should.equal(cachedRes);
    });

    it('getChainAddressFromSymbol() should return an address when a chain id and token symbol are passed as params', function () {
        let tokenSymbol = "DAI";
        let chainId = "137";
        let res = TokenUtils.getChainAddressFromSymbol(tokenSymbol, chainId);
        res.should.be.an('string');
        res.should.equal('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');

        let cachedRes = TokenUtils.getChainAddressFromSymbol(tokenSymbol, chainId);
        res.should.equal(cachedRes);
    });

    it('getSymbolFromRequestQueryParam() should return symbol on passing a symbol', function () {
        let res = TokenUtils.getSymbolFromRequestQueryParam("USDC");
        res.should.equal("USDC")
    });

    it('getSymbolFromRequestQueryParam() should return symbol on passing an address', function () {
        let res = TokenUtils.getSymbolFromRequestQueryParam("0xc2132d05d31c914a87c6611c10748aeb04b58e8f");
        res.should.be.an('string');
        res.should.equal("USDT")
    });


    it('getAllBridgeableTokens() should return all tokens', function () {
        let res = TokenUtils.getAllBridgeableTokens();
        res.should.be.an('array');
        res[0].should.be.an('object')
        res.length.should.be.greaterThan(15) // Loose check to ensure the results are across chains
    });

});
