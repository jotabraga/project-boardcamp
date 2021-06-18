import createCustomers from './createCustomers.js';
import readCustomers from './readCustomers.js';
import getCustomerById from './getCustomerById.js';
import updateCustomers from './updateCustomers.js';

export default function customers(app, connection){
    createCustomers(app, connection);
    readCustomers(app, connection);
    getCustomerById(app, connection);
    updateCustomers(app, connection);
}