import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumcloneuser',
  password: '123',
  database: 'mediumclone',
};

export default config;
