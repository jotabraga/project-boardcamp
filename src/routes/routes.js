import connection from '../database/connection.js'
import categories from './categories/categories.js';
import customers from './customers/customers.js';
import games from './games/games.js';

export default function routes(app){
    categories(app, connection);
    games(app,connection);
    customers(app,connection);
}