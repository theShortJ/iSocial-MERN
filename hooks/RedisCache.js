//Adding Redis Cache Impl to cache the Query results returned by MongoDB.
const mongoose = require('mongoose');
const config = require('config');
const Redis = require('redis');
const Util = require('util');

// Adding REDIS instance URL for use in Cloud (Heroku)
if (process.env.REDIS_URL) {
    console.log("Using Heroku Redis Add-On Server");
}
const REDIS_URL = process.env.REDIS_URL || config.get('redisURI');

//Setting up the Redis connection.
const redisClient = Redis.createClient(REDIS_URL);
redisClient.flushall();
console.log('********** REDIS Client created! **********');

redisClient.get = Util.promisify(redisClient.get);

// Refernce to org self.
const exec = mongoose.Query.prototype.exec;

// Overriding the exec function to add timeout/cache search implmentation.
mongoose.Query.prototype.exec = async function () {
    //console.log('Overriden EXEC function');

    const key = JSON.stringify( Object.assign({}, this.getQuery(), {
        collection: this.collection.name
    }));

    console.log(key);
    let cachedData = '';

    if (key) {
        cachedData = await redisClient.get(key);
    }

    //console.log(cachedData);

    if (cachedData !== null && cachedData) {
        console.log('REDIS: Cache Loaded');
        const mongoDocuments = JSON.parse(cachedData);
        return Array.isArray(mongoDocuments) ? mongoDocuments.map( doc => new this.model(doc) ) : new this.model(mongoDocuments);
    }

    // Calling the org exec function defined over the prototype chain.
    const result = await exec.apply(this, arguments);
    //console.log('result:::::' + result);
    redisClient.set(key, JSON.stringify(result), Redis.print );

    return result;
};

// module.exports = {
//     CacheClear(keyToBeRemoved){
//         return redisClient.del(keyToBeRemoved);
//     }
// }
