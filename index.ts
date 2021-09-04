import * as crypto from 'crypto'

let nonce = 0;

async function generateHash(input: string): Promise<string> {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(input);
  
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');  
    return hashHex;
}

async function calculateHashWithNonce(nonce: number): Promise<string> {
    const data = 'Hello World' + nonce;
    return generateHash(data);
  }

async function mine(): Promise<void> {
  let hash: string;
    do {
      hash = await calculateHashWithNonce(++nonce);
    } while (hash.startsWith('0000') === false);
  
    console.log(`Hash: ${hash}, nonce: ${nonce}`);
  }

mine();
