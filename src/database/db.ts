import { createConnection } from 'mysql';
export class DatabaseConnection {
    static instance: DatabaseConnection;
    connection: any;
    
    private constructor() {
        this.generateConnection();
    }

    public static getInstance(): DatabaseConnection {
        if(!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    private generateConnection() {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: 'root',
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });
    }

    executeQuery(_query: string, params: any) {
        this.connection.connect(() => {
            this.connection.query(_query, params, (error: any, results: any) => {
                if(error) throw error;
                return results;
            });
        });
    }
}