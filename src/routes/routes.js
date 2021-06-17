import connection from '../database/connection.js'
import categories from './categories/categories.js';

export default function routes(app){

    categories(app, connection);

}