const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASW}@${process.env.DATABASE_NAME}.i2vipbr.mongodb.net/?retryWrites=true&w=majority`;

class MongoDB {

    // Generar el cliente de MongoDB para aplicar el patrón Singleton
    constructor() {

        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        // Nombre base de datos
        this.name = 'shared-university-tasks';
    }

    connect() {

        // Validar si hay creada una conexión o es necesario crear una (Singleton)
        if (!this.connection) {

            this.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Base de datos conectada correctamente');
                    resolve(this.client.db(this.name));
                });
            })
        }
        return this.connection;
    }
}

module.exports = MongoDB;