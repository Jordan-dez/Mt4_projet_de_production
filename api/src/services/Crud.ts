import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { DBConfig } from "../database/db.config";
import { DbTable } from "../entities/types/DbTable";
import { IUpdateResponse } from "../entities/types/IUpdateResponse";
import { NotFoundError } from "../errors/NotFoundError";

export class Crud {
    private static db: Pool = DBConfig.Connection;

    public static async Create<T>(options: {
        body: T,
        table: DbTable
    }): Promise<any> {
      try {
        const { body, table } = options;
        const data = await this.db.query<OkPacket>(`INSERT INTO ${table} SET ?`, body);

        return {
            id: data[0].insertId
        }
      } catch (error) {
        throw error;
      }
    }

    public static async Read<T>(options: {
        table: DbTable, 
        idKey: string, 
        idValue: number|string, 
        columns: string[]
      }): Promise<T> {
          const data = await this.db.query<T[] & RowDataPacket[]>(`select ${options.columns.join(',')} from ${options.table} where ${options.idKey} = ?`, [options.idValue]);
          
          if (data[0].length > 0) {
            return data[0][0];
          } else {
            throw new NotFoundError();
          }
    }

    public static async Update<T>(options: {
      body: T, 
      table: DbTable, 
      idKey: string, 
      idValue: number|string
    }): Promise<IUpdateResponse> {
  
      const data = await this.db.query<OkPacket>(`update ${options.table} set ? where ${options.idKey} = ?`, [options.body, options.idValue]);
  
      return {
        id: options.idValue,
        rows: data[0].affectedRows
      } 
    }
}
