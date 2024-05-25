// server.js 
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import Replicate from "replicate";
import dotenv from 'dotenv';
dotenv.config();
const replicate = new Replicate({
  auth:  process.env.REPLICATE_AUTH_TOKEN,
});

// Función para llamar a la API de Replicate
async function replicateRun(UserPrompt) {
   
    const output = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            width: 768,
            height: 768,
            prompt: UserPrompt,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50
          }
        }
      );

    const data = output;
    return data;
}


const app = express();
const server = createServer(app); // Crear un servidor HTTP
// Configurar el endpoint HTTP
app.get('/', (req, res) => {
    res.send('{ "type": "log", "message": "Welcome to the website"}');
});

// Crear el servidor WebSocket
const wss = new WebSocketServer({ server });

function isJsonString(str) {
    try {
        const obj = JSON.parse(str);
        return obj && typeof obj === 'object';
    } catch (e) {
        return false;
    }
}

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Enviar un mensaje al cliente
    
    ws.send('{ "type": "log", "message": "Welcome new client!"}');

    // Manejar mensajes recibidos del cliente
    ws.on('message', async (message) => {
        if (isJsonString(message)) {
            // Es un objeto JSON válido
            const msgObject = JSON.parse(message);
            console.log('Received object:', msgObject);
           
            if (msgObject.type == 'prompt') {

                // Realizar llamada a la API de Replicate
                try {
                    const output = await replicateRun(msgObject.prompt);
                    console.log(output);

                    // Enviar el output al cliente
                    ws.send(JSON.stringify({ "type": 'output', "data": output }));

                } catch (error) {
                    console.error('Error calling replicateRun:', error);
                    ws.send(JSON.stringify({ "type": 'error', "message": 'Error processing prompt' }));
                }
            } 

        } else {
            // Es un string simple
            console.log(`a Received message: ${message}`);
            // Opcionalmente, puedes enviar una respuesta al cliente
            
            ws.send(`{ "type": "log", "message": 'You said: ${message}' }`);
        }
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Usar el puerto asignado por Render o 3000 en local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
