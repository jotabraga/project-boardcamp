import createCategories from './createCategories.js';
import readCategories from './readCategories.js';

export default function categories(app, connection){
    createCategories(app, connection);
    readCategories(app, connection);
}