import * as crypto from 'crypto';

class Block<T>{
    readonly hash: string;
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: T
    ){
        this.hash = '';
    }

    private calculateHash(): string{
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}