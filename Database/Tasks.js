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

    /** READ ALL */
    async getTasks() {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').find().toArray();
            } catch (err) {
                return undefined;
            }
        });
    }

    /** UPDATE */
    async updateTask(_id, data) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').updateOne({ _id: ObjectId(_id) }, { $set: { ...data } });
            } catch (err) {
                return undefined;
            }
        });
    }

    /** DELETE */
    async deleteTask(_id) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').deleteOne({ _id: ObjectId(_id) });
            } catch (err) {
                return undefined;
            }
        });
    }
}

module.exports = Tasks;