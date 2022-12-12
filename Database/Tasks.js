const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Tasks extends MongoDB {

    constructor() {
        super();
    }

    /** CREATE */
    async createTask(data) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').insertOne(data);
            } catch (err) {
                return undefined;
            }
        });
    }
}

module.exports = Tasks;