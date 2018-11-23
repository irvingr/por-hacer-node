/**
 * Configuración del yargs.
 */
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de tarea por hacer'
}
const estado = {
    alias: 'e',
    default: 'terminado',
    choices: ['terminado', 'pendiente'],
    desc: 'Asigna un estado a una tarea'
}
const filtroEstado = {
    alias: 'f',
    default: 'all',
    choices: ['all', 'terminado', 'pendiente'],
    desc: 'Filtra las tareas según el estado'
}
const argv = require('yargs')
    .command('crear', 'Crea un elemento por Hacer', { descripcion })
    .command('listar', 'Muestra las tareas por Hacer', { filtroEstado })
    .command('actualizar', 'Actualiza el estado de una tarea', { descripcion, estado })
    .command('borrar', 'Elimina una tarea', { descripcion })
    .alias('h', 'help')
    .alias('v', 'version')
    .help()
    .argv;
module.exports = {
    argv
}