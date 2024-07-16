import mssql from 'mssql';
import { sqlConfig } from '../config/config';

export class Helper {

  static async query(query: string) {
    let pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;

    let result = ((await pool).request().query(query));

    return result;
  }

  static async execute(stored_procedure: string, data: { [c: string | number]: string | number }) {
    const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;

    let request = ((await pool).request()) as mssql.Request;

    for (let key in data) {
      request.input(key, data[key]);
    }

    const result = await request.execute(stored_procedure);
    
    return result;
  }

}