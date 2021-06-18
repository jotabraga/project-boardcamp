import createRents from './createRents.js';
import readRents from './readRents.js';

export default function rents(app, connection){
    createRents (app, connection);
    readRents(app, connection);    
}