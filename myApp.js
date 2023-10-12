//1. Instala y configura Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
const URI = process.env['MONGO_URI'];

//Conneccion a MongoDB
mongoose.connect(URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

//2. Crea un modelo
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

//3. Crea y guarda un registro de un modelo
const createAndSavePerson = (done) => {
  const person = new Person({
      name: 'Brayan Hernandez', 
      age: 22, 
      favoriteFoods: ['tacos', 'carne asada']
  });
  
  person.save((err, data) => {
    if (err) return console.log(err);
    
    done(null, person);
  })
};

//Array de personas 
let arrayOfPeople = [
  {name: 'Juan Pablo', age: 16, favoriteFoods:['tacos']},
  {name: 'Samuel Hernandez', age: 54, favoriteFoods:['birria']}
];

//4. Crea muchos registros con model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    
    done(null, people);
  });
};

//5. Usa model.find() para buscar en tu base de datos
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if(err) return console.log(err);
    
    done(null, personFound);
  }); 
};

//6. Usa model.findOne() para devolver un único documento coincidente de tu base de datos
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return console.log(err);

    done(null, data);
  });
};

//7. Usa model.findById() para buscar en tu base de datos por _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, person) =>{
    if(err) return console.log(err);

    done(null, person);
  });
};

//8. Realiza las actualizaciones clásicas ejecutando "find", "edit" y "save"
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) =>{
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatePerson) => {
      if(err) return console.log(err);

      done(null, updatePerson);
    })
  });
};

//9. Realiza nuevas actualizaciones en un documento usando model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateAge) => {
  if(err) return console.log(err); 

  done(null, updateAge);
  });
};

//10. Elimina un documento usando el método model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, deletePerson) => {
    if(err) return console.log(err);

    done(null, deletePerson);
  })
};

//11. Elimina muchos documentos con model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.log(err);

    done(null, res);
  });
};

//Auxiliares de consulta de búsqueda en cadena para restringir los resultados de búsqued
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1})
  .limit(2)
  .select({ age: 0 })
  .exec((err, people) => {
    if(err) return console.log(err);

    done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
