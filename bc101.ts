import * as crypto from 'crypto';
import * as chalk from 'chalk'

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.black.bgWhiteBright.bold;

class Block<T>{
    readonly hash: string;
    readonly nonce: number;
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: T | string
    ){
        const {nonce, hash} = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }

    private calculateHash(nonce: number): string{
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    private mine(): {nonce: number, hash: string}{
        let hash: string;
        let nonce = 0;

        do{
            hash = this.calculateHash(++nonce);
        }while(hash.startsWith('00000')===false);

        return {
            nonce,hash
        }
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

    console.log(info(JSON.stringify(blockchain, null, 2)));
}