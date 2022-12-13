const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Tasks extends MongoDB {

    constructor() {
        super();
    }

    /** GET TASK */
    async getTask(eventId) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').findOne({ eventId: eventId });
            } catch (err) {
                return undefined;
            }
        });
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
    async updateTask(eventId, data) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').updateOne({ eventId: eventId }, { $set: { ...data } });
            } catch (err) {
                return undefined;
            }
        });
    }

    /** DELETE */
    async deleteTask(eventId) {
        return this.connect().then((db) => {
            try {
                return db.collection('Tasks').deleteOne({ eventId: eventId });
            } catch (err) {
                return undefined;
            }
        });
    }
}

module.exports = Tasks;