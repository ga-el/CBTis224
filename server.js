import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 

const app = express();
app.use(cors());
app.use(express.json());

const mongo_uri = 'mongodb+srv://admin:Yi1Ew5u8cEmQ0UTc@cluster0.yit3mwl.mongodb.net/cbtis224?retryWrites=true&w=majority';

mongoose.connect(mongo_uri)
    .then(() => console.log('conectado'))
    .catch(e => console.log('hubo un fallo:', e));

const schema = new mongoose.Schema({
    numControl: String,
    nombre: String,
    apellidoP: String,
    apellidoM: String,
    turno: String,
    grupo: String
});

const Alumno = mongoose.model('Alumnos', schema);

app.post('/enviar', async (req, res) => {
    try {
        const nuevo = new Alumno(req.body);
        await nuevo.save();
        console.log('registro guardado:', req.body.nombre);
        res.send({ status: 'ok' });
    } catch (err) {
        console.error('Error al guardar el alumno:', err);
        res.status(500).send('Error ');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`puerto ${PORT}`);
});
