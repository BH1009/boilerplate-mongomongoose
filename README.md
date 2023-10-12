# MongoDB and Mongoose Challenges

This is the boilerplate for the MongoDB and Mongoose lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/

## Descripción

MongoDB es una aplicación de base de datos que almacena documentos JSON (o registros) que puede usar en su aplicación. A diferencia de SQL, otro tipo de base de datos, MongoDB es una base de datos no relacional o "NoSQL". Esto significa que MongoDB almacena todos los datos asociados dentro de un registro, en lugar de almacenarlos en muchas tablas preestablecidas como en una base de datos SQL.

Mongoose es un paquete npm popular para interactuar con MongoDB. Con Mongoose, puede usar objetos de JavaScript sin formato en lugar de JSON, lo que facilita el trabajo con MongoDB. Además, le permite crear planos para sus documentos llamados esquemas, para que no guarde accidentalmente el tipo de datos incorrecto y provoque errores más adelante.

En los cursos de MongoDB y Mongoose, aprenderás los fundamentos para trabajar con datos persistentes, incluyendo cómo configurar un modelo, guardar, eliminar y encontrar documentos en la base de datos.

## 1. Crea un modelo
CRUD Parte 1: CREATE (Crear)

En primer lugar, necesitamos un esquema. Cada esquema asigna a una colección de MongoDB. Define la forma de los documentos dentro de esa colección. Los esquemas son bloques de construcción para los modelos. Pueden ser anidados para crear modelos complejos, pero en este caso las cosas serán sencillas. Un modelo te permite crear instancias de tus objetos, llamados documentos.

Replit es un servidor real, y en los servidores reales, las interacciones con la base de datos ocurren en funciones de manejo. Estas funciones se ejecutan cuando ocurre algún evento (por ejemplo, alguien golpea un endpoint en tu API). Seguiremos el mismo enfoque en estos ejercicios. La función done() es un callback que nos dice que podemos proceder después de completar una operación asincrónica como insertar, buscar, actualizar o eliminar. Sigue la convención de Node, y debe ser llamado como done(null, data) en caso de éxito, o done(err) en caso de error.

Advertencia: ¡Al interactuar con servicios remotos, pueden ocurrir errores!

```javascript
/* Example */

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

## 3. Crea y guarda un registro de un modelo

En este desafío tendrás que crear y guardar un registro de un modelo.

Dentro de la función createAndSavePerson, crea una instancia de documento usando el constructor del modelo Person que construiste antes. Pasa al constructor un objeto con los campos name, agey favoriteFoods. Sus tipos deben adaptarse a los del personSchema. Luego, llama al método document.save() en la instancia del documento devuelto. Pásale un callback usando la convención de Node. Este es un patrón común; todos los siguientes métodos CRUD toman una función de callback como este como el último argumento.

```javascript
/* Example */

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});
```
## 4. Crea muchos registros con model.create()

A veces necesitas crear muchas instancias de tus modelos, por ejemplo, al sembrar una base de datos con datos iniciales. Model.create() toma un arreglo de objetos como [{name: 'John', ...}, {...}, ...] como primer argumento y los guarda todos en la base de datos.

Modifica la función createManyPeople para crear muchas personas usando Model.create() con el argumento arrayOfPeople.

## 5. Usa model.find() para buscar en tu base de datos

En su uso más simple, Model.find() acepta un documento de consulta (un objeto JSON) como el primer argumento, luego un callback. Devuelve un arreglo de coincidencias. Soporta una amplia gama de opciones de búsqueda. Lee más en la documentación.

Modifica la función findPeopleByName para encontrar a todas las personas que tengan un nombre dado, usando Model.find() -> [Person]

Utiliza el argumento de la función personName como clave de búsqueda.


## 6. Usa model.findOne() para devolver un único documento coincidente de tu base de datos

Model.findOne() se comporta como Model.find(), pero solo devuelve un documento (no un arreglo), incluso si hay varios elementos. Es especialmente útil a la hora de buscar por propiedades que has declarado como únicas.

Modifica la función findOneByFood para encontrar una sola persona que tenga cierta comida en los favoritos de la persona, usando Model.findOne() -> Person. Usa el argumento de función food como clave de búsqueda

## 7. Usa model.findById() para buscar en tu base de datos por _id

Al guardar un documento, MongoDB añade automáticamente el campo _id, y lo establece como una clave alfanumérica única. Buscar por _id es una operación extremadamente frecuente, así que Mongoose proporciona un método dedicado para ello.

Modifique el findPersonById para encontrar la única persona que tenga una determinada _id, usando Model.findById() -> Person. Utiliza el argumento de la función personId como clave de búsqued

## 8. Realiza las actualizaciones clásicas ejecutando "find", "edit" y "save"

En los buenos tiempos, esto era lo que había que hacer si se quería editar un documento, y poder utilizarlo de alguna manera (por ejemplo, enviándolo de vuelta en una respuesta del servidor). Mongoose tiene un método de actualización dedicado: Model.update(). Está vinculado al controlador de bajo nivel de mongo. Puedes editar en masa muchos documentos que coincidan con ciertos criterios, pero no envía de vuelta el documento actualizado, sólo un mensaje de "estado". Además, dificulta las validaciones de modelos, porque simplemente llama directamente al controlador mongo.

Modifica la función findEditThenSave para encontrar a una persona por _id (usa cualquiera de los métodos anteriores) con el parámetro personId como la clave de búsqueda. Añade "hamburger" a la lista de favoriteFoods (puedes usar Array.push()). Luego - dentro del callback de búsqueda: save() la Person actualizada.

Nota: Esto puede ser complicado, si está en tu esquema, declaraste favoriteFoods como un arreglo, sin especificar el tipo (por ejemplo [String]). En ese caso, favoriteFoods por defecto es de tipo Mixto, y tienes que marcarlo manualmente como editado usando document.markModified('edited-field').

## 9. Realiza nuevas actualizaciones en un documento usando model.findOneAndUpdate()

Las versiones recientes de Mongoose tienen métodos para simplificar la actualización de documentos. Algunas características más avanzadas (por ejemplo, pre/post hooks, validación) se comportan de forma diferente con este enfoque, por lo que el método clásico sigue siendo útil en muchas situaciones. findByIdAndUpdate() puede ser usado al buscar por id.

Modifica la función findAndUpdate para encontrar a una persona por Name y establece la edad de la persona a 20. Utiliza el parámetro de la función personName como clave de búsqueda.

## 10. Elimina un documento usando el método model.findByIdAndRemove

findByIdAndRemove y findOneAndRemove son como los métodos de actualización anteriores. Éstos pasan el documento retirado a la base de datos. Como siempre, utiliza el argumento de la función personId como la clave de búsqueda.

## 11. Elimina muchos documentos con model.remove()

Model.remove() es útil para eliminar todos los documentos que coincidan con los criterios dados.

Modifica la función removeManyPeople para eliminar a todas las personas cuyo nombre esté dentro de la variable nameToRemove, usando Model.remove(). Pásalo a un documento de consulta con el campo name establecido, y un callback

## 12. Auxiliares de consulta de búsqueda en cadena para restringir los resultados de búsqueda

Si no pasas la función callback como el último argumento para Model.find() (o hacia otro método de búsqueda), la consulta no se ejecuta. Puedes almacenar la consulta en una variable para su posterior uso. Este tipo de objeto te permite construir la consulta usando sintaxis de encadenamiento. La búsqueda real en la base de datos se ejecuta cuando finalmente encadena el método .exec(). Siempre necesitas pasar tu función callback a este último método. Hay muchas ayudas de consulta, aquí usaremos el método comúnmente usado.

Modifica la función queryChain para encontrar a gente que le gusta la comida especificada por la variable denominada foodToSearch. Ordénalos por name, limita los resultados para dos documentos, y oculta su edad. Encadena .find(), .sort(), .limit(), .select(), y entonces .exec(). Pasa la función callback done(err, data) a exec().
