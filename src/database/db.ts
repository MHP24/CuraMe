import { createConnection } from 'mysql';
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: any;
    
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

    public executeQuery(_query: string, params: any): Promise<any> {
        this.connection.connect();

        return new Promise((resolve, reject) => {
            this.connection.query(_query, params, (error: any, result: any) => {
                if(error) {
                    reject(error);
                }else {
                    resolve(result);
                }
            });
        });
    }

    public doQuery(_query: string, params: any): void {
        this.connection.connect(() => {
            this.connection.query(_query, params, (error: any, results: any) => {
                if(error) throw error;
                return results;
            });
        });
    }
}