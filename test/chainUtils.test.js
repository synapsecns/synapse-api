import * as ChainUtils from "../server/utils/chainUtils.js";
import chai from "chai"
import chaiSubset from "chai-subset"

chai.use(chaiSubset);

const expect = chai.expect;
const should = chai.should();

describe('ChainUtils unit tests', () => {

    it('getIds() should return list of supported chain IDs', function () {
        let res = ChainUtils.getIds();
        res.should.be.an('array');
        expect(res).containSubset([1, 10, 288]);
    });

    it('getHexIds() should return list of chain IDs ins hexadecimals', function () {
        let res = ChainUtils.getHexIds();
        res.should.be.an('array');
    });

    it('getNames() should return list of chain names', function () {
        let res = ChainUtils.getNames();
        res.should.be.an('array');
        expect(res).containSubset(["BSC", "ETH", "OPTIMISM"]);
    });

    it('getObjectFromId() should return JSON Object for a chain', function () {
        let res = ChainUtils.getObjectFromId("1");
        res.should.be.an('object');
        res.should.have.property('name');
        res.should.have.property('chainId');
        res.should.have.property('chainCurrency');
    });

    it('getIdFromRequestQueryParam() should return ID on passing a chain ID', function () {
        let res = ChainUtils.getIdFromRequestQueryParam("1");
        res.should.be.an('number');
        res.should.equal(1)
    });

    it('getIdFromRequestQueryParam() should return ID on passing a chain ID', function () {
        let res = ChainUtils.getIdFromRequestQueryParam("137");
        res.should.be.an('number');
        res.should.equal(137)
    });

    it('getIdFromRequestQueryParam() should return ID on passing a chain symbol', function () {
        let res = ChainUtils.getIdFromRequestQueryParam("POLYGON");
        res.should.be.an('number');
        res.should.equal(137)
    });

});
