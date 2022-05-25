import *as express from "express"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { rtdb } from "./database";
import { state } from "./state";



const app = express(); //Inicializamos express en alguna variable.
app.use(express.json());
var cors = require('cors')
app.use(cors());
const port = 3000//inicializamos el puerto que va a escuchar. 

app.post("/signup", (req, res) => {
  const body = req.body;
  res.json(body.email);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function main () {
  state.init();
  state.setNameAndEmail("Gonzalo", "Gonzalocortez1991@hotmail.com")
  state.signIn();
}
main();