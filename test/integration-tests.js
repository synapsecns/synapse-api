import chai from "chai"
import chaiHttp from "chai-http";
import app from "../server/index.js"

const should = chai.should();

chai.use(chaiHttp);
describe('Synapse API Integration Tests', () => {

    it('list out bridgable tokens', (done) => {
        chai.request(app)
            .get('/v1/get_bridgable_tokens')
            .query({
                chain: 1,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('symbol');
                res.body[0].should.have.property('decimals');
                res.body[0].should.have.property('addresses');

                done();
            });
    });

    it('generate unsigned bridge transaction', (done) => {
        chai.request(app)
            .get('/v1/generate_unsigned_bridge_txn')
            .query({
                fromChain: "AVALANCHE",
                toChain:0x38,
                fromToken: "USDC",
                toToken: "USDC",
                amountFrom: 10,
                address: "0x2D2c027E0d1A899a1965910Dd272bcaE1cD03c22"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('unsigned_data');
                res.body.should.have.property('to');
                res.body.should.have.property('to');
                res.body.should.have.property('gasPrice');
                res.body.should.have.property('gasLimit');

                done();
            });
    });

    it('get all chains token is tradeable on', (done) => {
        chai.request(app)
            .get('/v1/get_chains_for_token')
            .query({
                token: "ETH",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('chainId');
                res.body[0].should.have.property('chainCurrency');

                done();
            });
    });

    it('generate unsigned bridge approval transaction', (done) => {
        chai.request(app)
            .get('/v1/generate_unsigned_bridge_approval_txn')
            .query({
                fromChain: "ETH",
                fromToken: "ETH",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('unsigned_data');
                res.body.should.have.property('to');
                res.body.should.have.property('maxPriorityFeePerGas');

                done();
            });
    });

    it('generate bridge transaction parameters', (done) => {
        chai.request(app)
            .get('/v1/generate_bridge_txn_params')
            .query({
                fromChain: "AVALANCHE",
                toChain:0x38,
                fromToken: "USDC",
                toToken: "USDC",
                amountFrom: 1,
                amountTo: 1
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('tokenFrom');
                res.body.should.have.property('tokenTo');
                res.body.should.have.property('chainIdTo');
                res.body.should.have.property('chainIdTo');
                res.body.should.have.property('amountFrom');
                res.body.should.have.property('amountTo');

                done();
            });
    });

    it('estimate bridge output', (done) => {
        chai.request(app)
            .get('/v1/estimate_bridge_output')
            .query({
                fromChain: "AVALANCHE",
                toChain:"BSC",
                fromToken: "USDC",
                toToken: "USDC",
                amountFrom: 10
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('amountToReceive');
                res.body.should.have.property('bridgeFee');

                done();
            });
    });

});