const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

mongoose.connect('mongodb://localhost:27017/movies',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error!!!'));
db.once('open', () => console.log('It works!!!'));

const directorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date
});

const movieSchema = mongoose.Schema({
    title: String,
    director: {
        type: ObjectId,
        ref: 'Director'
    },
    staff: {
        type: ObjectId,
        ref: 'Otro'
    }
})

const Director = mongoose.model('Director', directorSchema);
const Movie = mongoose.model('Movie', movieSchema);

Movie.find()
    .populate('director')
    .exec()
    .then(movies => console.log(movies));



// Create
// const director1 = new Director({
//     firstName: 'Steven',
//     lastName: 'Spielberg',
//     birthDate: new Date('1960-01-01')
// })

// director1.save()
//     .then(director => console.log(director));

// const movie1 = new Movie({
//     title: "Avatar",
//     director: ObjectId("5d7aef7fc967e4b69bc4207d")
// })

// movie1.save()

// Read
// Director.find((err, movies) => {
//     if (err) throw err;
//     console.log(movies);
// })

// Director.find({firstName: /^Ja/}, (err, directors) => {
//     console.log(directors);
// });

// Director.find().exec().then(director => console.log(director));

// Director.findById({_id: "5d7ae8818d1ce4b1df590637"}).exec()
//     .then(director => console.log(director));

// const getDirectors = async () => {
//     directors = await Director.find().exec()
// }

// Update
// Director.findByIdAndUpdate(
//     {_id: "5d7ae8818d1ce4b1df590637"},
//     {
//         $set: {lastName: 'Cameron'}
//     }
// ).exec().then(director => console.log(director));

// Director.findByIdAndRemove({_id: "5d7ae8818d1ce4b1df590637"})
//     .exec();

// Director.find().remove();

