const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123',
})

client.connect()
client.query('SELECT NOW()', (err: Error, res: Response) => {
  if (err) throw err
  console.log(res)
  client.end()
})

export default client