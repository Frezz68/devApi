import mongoose from "mongoose";

const { Schema } = mongoose

const exempleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    colors: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Exemple = mongoose.model('Exemple', exempleSchema)


/*Exemple.create({
    name: 'Test product',
    description: 'coucou voili voilou',
    colors: ['black','red','white'],
    price: 1000
})*/
const findAll = async () => {
    const exemples = await Exemple.find({})
    console.log("FIND ALL ==================================",exemples)
}

const findById = async () => {
    const exemples = await Exemple.findById('637219b522e266e620663fc2')
    console.log("FIND BY ID ==================================",exemples)
}
const updateById = async () => {
    //methode 1
    const exemples = await Exemple.findByIdAndUpdate('637219b522e266e620663fc2',{name: "Premier élément"},{runValidators: true,new: true})
    //methode 2
    //const exemples = await Exemple.findById('637219b522e266e620663fc2')
    //exemples.name = "Modification"
    //exemples.save()
    //methode 3
    //const exemples = await Exemple.findByIdAndUpdate('637219b522e266e620663fc2')
    //exemples.set({
      //  name: "Modifié avec le set"
    //})
    //exemples.save()

    console.log("UPDATE BY ID ==================================",exemples)
}
const deleteById = async () =>{
    const exemple = await Exemple.findByIdAndDelete("637219b522e266e620663fc2")
}

//updateById()
//findAll()
//findById()

export default Exemple