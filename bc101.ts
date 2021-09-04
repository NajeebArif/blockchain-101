import * as crypto from 'crypto';
import * as chalk from 'chalk'

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.black.bgWhiteBright.bold;

class Block<T>{
    readonly hash: string;
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: T | string
    ){
        this.hash = '';
    }

    private calculateHash(): string{
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}

class Blockchain<T>{
    private readonly chain: Block<T>[] = [];

    private get latestBlock(): Block<T>{
        return this.chain[this.chain.length-1];
    }

    constructor(){
        const genesisBlock = new Block<T>(0,'0',Date.now(),'Genesis Block');
        this.chain.push(genesisBlock)
    }

    addBlock(t: T): void{
        const block = new Block<T>(this.latestBlock.index+1,this.latestBlock.hash,Date.now(),t);
        this.chain.push(block);
    }
}

export function mine(){
    const blockchain = new Blockchain<string>();
    console.log(warning('mining block 1'))
    blockchain.addBlock('First Block')
    console.log(warning('mining block 2'))
    blockchain.addBlock('Second Block')

    console.log(info(JSON.stringify(blockchain)));
}