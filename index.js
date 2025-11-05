const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());


let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    },
    {
        id: "4",
        content: "Express is easy",
        important: false
    }
]

// get method

app.get('/', (request, response) => {
    response.send('<h1>hello world</h1>');
});

app.get('/api/notes', (request, response) => {
    response.json(notes);
});

//  a single note from resources

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    console.log('id: ', id);
    const note = notes.find(note => note.id === id);

    // send note or 404 code
    if (note) {
        response.send(note);
    } else {
        response.status(404).end();
    }
});

// delete

app.delete('/api/notes/:id', (request, response) => {

    const id = request.params.id;
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

// post

const generateId = () => {
    const maxId = Math.max(...notes.map(note => Number(note.id)));

    return String(maxId + 1);

};

app.post('/api/notes', (request, response) => {

   

    const body = request.body;
    

    if (!body.content) {
        return response.status(400).json(
            {error: 'content missing'}
        );
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }
    
    notes = notes.concat(note);

    response.json(note);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})