import createCustomers from './createCustomers.js';
import readCustomers from './readCustomers.js';

export default function customers(app, connection){
    createCustomers(app, connection);
    readCustomers(app, connection);
}