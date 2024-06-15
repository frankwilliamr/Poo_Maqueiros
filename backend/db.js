import mariadb from 'mariadb';

export const pool = mariadb.createPool({
  host: '172.19.0.2', //Mudar para o seu endereço
  port: 3306,
  user: 'root',
  database: 'Maqueiros',
  password: '12345',
});
