const fs = require('fs');
// Inicializar un Array.
let listadoPorHacer = [];

// Función que graba las tareas por hacer en un archivo JSON.
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); // Convierte un objeto a un JSON valido.
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar los datos', err);
    });
}

const cargarDB = () => {
    // Si el archivo data.json está vacio va a crear un objeto vació.
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

// Funcion de Crear.
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        estado: 'pendiente'
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

// Función mostrar listado de tareas por hacer.
const getListado = (estado) => {
    cargarDB();
    switch (estado) {
        case 'terminado':
            let tareasTerminadas = listadoPorHacer.filter(tarea => tarea.estado === estado);
            listadoPorHacer = tareasTerminadas;
            break;
        case 'pendiente':
            let tareasPendientes = listadoPorHacer.filter(tarea => tarea.estado === estado);
            listadoPorHacer = tareasPendientes;
            break;
        default:
            listadoPorHacer;
            break;
    }
    if (listadoPorHacer.length == 0) {
        console.log('No hay tareas por hacer'.green);
    }
    return listadoPorHacer;
}

// Función para actualizar el estado de la tarea.
const actualizar = (descripcion, estado) => {
    if (estado === 'terminado' || estado === 'pendiente') {
        cargarDB();
        // El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        if (index >= 0) {
            listadoPorHacer[index].estado = estado;
            guardarDB();
            return true;
        } else {
            return false;
        }
    } else {
        console.log('Valor de estado no válido');
    }
}

const deleted = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

// Otra forma de borrar
const deleted2 = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    deleted
}