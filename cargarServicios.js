const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(['8.8.8.8']);
const Servicio = require('./modelos/Servicio');
const servicios = require('./datos/servicios');

mongoose.connect('mongodb+srv://sharonandreamantillaurzola_db_user:Sharonmantilla2020@aprendocontigo.wyfiup4.mongodb.net/aprendocontigo?retryWrites=true&w=majority&appName=AprendoContigo')
    .then(async () => {
        console.log('MongoDB conectado');
        


        for (const servicio of servicios) {
        await Servicio.updateOne(
        { nombre: servicio.nombre },
        { $set: servicio },
        { upsert: true, runValidators: true }
        );
}

        console.log('Los 8 servicios fueron cargados correctamente');

        await mongoose.connection.close();
        console.log('Conexión cerrada');
    })
    .catch((error) => {
        console.log('Error:', error);
    });
