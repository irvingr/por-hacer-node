const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

// console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado(argv.filtroEstado);
        // La sentencia for...of crea un bucle que itera a través de los elementos de objetos.
        for (let tarea of listado) {
            console.log('============ Por Hacer ============'.cyan);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.estado);
            console.log('===================================\n'.cyan);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.estado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.deleted(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log(`Comando ${ colors.red(comando) } no reconocido`);
        break;
}