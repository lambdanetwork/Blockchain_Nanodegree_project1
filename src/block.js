/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
        this.hash = null;
        this.height = 0;
        this.time = 0;
        this.previousBlockHash = ''; //string
        this.body = Buffer.from(JSON.stringify(data)).toString('hex');
    }
    
    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     *  Steps:
     *  1. Return a new promise to allow the method be called asynchronous.
     *  2. Save the in auxiliary variable the current hash of the block (`this` represent the block object)
     *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
     *  4. Compare if the auxiliary hash value is different from the calculated one.
     *  5. Resolve true or false depending if it is valid or not.
     *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
     */
    async validate() {
        const hashAux = this.hash;                                        // Save in auxiliary variable the current block hash
        this.hash = null; 

        // Recalculate the hash of the Block
        const recalculateHash = SHA256(JSON.stringify(this)).toString();
        const valid = recalculateHash === hashAux;

        // putting the hashback;
        this.hash = hashAux;
        
        // Comparing if the hashes changed
        // Returning the Block is not valid
        // Returning the Block is valid
        return valid;
    }

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
   async getBData() {
            if(this.height <= 0){
                // don't return genesis block
                return null;
            }

            // Getting the encoded data saved in the Block
            // Decoding the data to retrieve the JSON representation of the object
            const decoded = hex2ascii(this.body);
            // Parse the data to an object to be retrieve.
            const decodedObject = JSON.parse(decoded);
    
            // Resolve with the data if the object isn't the Genesis block
            return decodedObject;
    }
}

module.exports.Block = Block;                    // Exposing the Block class as a module