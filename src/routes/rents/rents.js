import createRents from './createRents.js';
import deleteRents from './deleteRents.js';
import readRents from './readRents.js';
import closeRents from './closeRents.js';


export default function rents(app, connection){
    createRents (app, connection);
    readRents(app, connection);    
    deleteRents(app, connection);
    closeRents(app, connection);
}