import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import workoutsRouter from './routes/workouts-routes.js';
import exercisesRouter from './routes/exercises-routes.js';
import routinesRouter from './routes/routines-routes.js';


const PORT = 4001

const app = express()

// The following middleware ensures that the server is secure and can handle different types of requests

// This is needed to handle requests from different origins. For React, this is needed because the React app runs on a different port than the server.
app.use(cors())

// This is needed to secure the server by setting various HTTP headers. It gives us some security enhancements by default.
app.use(helmet())

// This is needed to compress the server responses, which makes the server faster.
app.use(compression())

// This takes a URL and returns an JSON object. 'extended: false' means that the object can be any type, not just a string or array.
app.use(bodyParser.urlencoded({ extended: false }))

// This puts data in a format that the server can understand. It takes a JSON object and returns a JSON string.
app.use(bodyParser.json())

app.use('/workouts', workoutsRouter)
app.use('/exercises', exercisesRouter)
app.use('/routines', routinesRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, function () {
    console.log(`Server is running on: ${PORT}`)
})

export default app;