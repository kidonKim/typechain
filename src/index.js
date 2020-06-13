"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHahs, timestamp, data) { return CryptoJS.SHA256(index + previousHahs + timestamp + data).toString(); };
    Block.validateStructrue = function (aBlock) {
        return typeof aBlock.index === "number"
            && typeof aBlock.hash === "string"
            && typeof aBlock.previousHash === "string"
            && typeof aBlock.timestamp === "number"
            && typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "125112512", "", "Hello", 123456);
var blockchain = [genesisBlock];
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var nextTimestamp = getNewTimeStamp();
    var nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    var newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) { return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data); };
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructrue(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth blcok");
console.log(blockchain);
