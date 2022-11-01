import { createConnection } from 'mysql';
export class DatabaseConnection {
    private static instance: DatabaseConnection;

    private constructor() {
        createConnection({
            host: process.env.DB_HOST,
            user: 'root',
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        }).connect(error => {
            if(error) {
                console.log(error);
                return;
            }
            console.log(`MYSQL - database ${process.env.DB_DATABASE}, connected`);
        });
    }

    public static getInstance(): DatabaseConnection {
        if(!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
}