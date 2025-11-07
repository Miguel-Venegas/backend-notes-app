require('dotenv').config();
const express = require("express");
const app = express();
const Note = require('./models/note');

app.use(express.json());
app.use(express.static('dist'));





// let notes = [
//     {
//         id: "1",
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: "2",
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: "3",
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     },
//     {
//         id: "4",
//         content: "Express is easy",
//         important: false
//     }
// ]

// get method

app.get('/', (request, response) => {
    response.send('<h1>hello world</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    });
    // response.json(notes);
});

//  a single note from resources

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
});

// delete

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id

    Note.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                response.status(200).send(`Deleted note: ${result.content}`)
            } else {
                response.status(404).json({ error: 'Note not found' })
            }
        })
        .catch(error => {
            console.error(error)
            response.status(400).json({ error: 'malformatted id' })
        })
})


// post

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
});


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});