const { Block } = require("../src/block")
const { Blockchain } = require("../src/blockchain");

const genesisBlock = new Block({data: 'Genesis Block'});
const dataBlock = new Block({ data : 'Hello world'});
const dataBlock1 = new Block({ data : 'Hello 1'});
const dataBlock2 = new Block({ data : 'Hello 2'});
const dataBlock3 = new Block({ data : 'Hello 3'});

const bc = new Blockchain();
console.log(bc.height === 0);
bc._addBlock(dataBlock);
bc._addBlock(dataBlock1);
bc._addBlock(dataBlock2);
bc._addBlock(dataBlock3);

console.log(bc)

const validation = dataBlock.validate();
console.log("validation", validation)

const dataInDataBlock = dataBlock.getBData();
const dataInGenesisBlock = genesisBlock.getBData();
console.log(dataInDataBlock);
console.log(dataInGenesisBlock)

async function main(){
    dataBlock2.previousBlockHash = 'asdf'
    const validateAllChain = await bc.validateChain();
    console.log(validateAllChain)
};

main();