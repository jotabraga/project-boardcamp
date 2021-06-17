import connection from '../database/connection.js'
import categories from './categories/categories.js';
import games from './games/games.js';

export default function routes(app){
    categories(app, connection);
    games(app,connection);
}