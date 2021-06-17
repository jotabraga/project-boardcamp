import createGames from './createGames.js';
import readGames from './readGames.js';

export default function games(app, connection){
    createGames(app, connection);
    readGames(app, connection);
}