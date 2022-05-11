import pg_pool from "../databse";

export type TestTable = {
    id: number,
    name: string
}

export class TestStore {

    async index(): Promise<TestTable[]> {
        let conn ;
        try {
            conn = await pg_pool.connect()
            const sql = 'select * from test_table'
            const result = await pg_pool.query(sql)

            // end connection 
            conn.release()
            pg_pool.end()

            return result.rows;
        }
        catch (err) {
            if (conn != null) {
                conn.release()
            }
            pg_pool.end()
            throw new Error("can't get entires : " + err)
        }
    }

}




