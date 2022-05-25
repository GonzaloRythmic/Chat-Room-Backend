import { json } from "body-parser";
import { Message } from "firebase-admin/lib/messaging/messaging-api";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { chatRoomRef, rtdb } from "./database";
// import fetch from 'node-fetch';

const API_URL_BASE = 'http://localhost:3000/'
type Messages = {
    name: string,
    message: [],
    id: string
  }

const state = {
    data: {
        name: '',
        email: '',
        message: []
    },
    listener: [], 
    // Initializer
    init() {
       const messageChatRoomRef = ref(rtdb, 'ChatRoom/Room_1')
       onValue(messageChatRoomRef, (snapshot) => {
        const messagesFromServer = snapshot.val();
        console.log(messagesFromServer);
       })
     
    },
    getState(){
        return this.data;
    },


    setNameAndEmail(name: string, email: string){
        const currentState = this.getState();
        currentState.name = name;
        currentState.email = email;
        const newState = this.setState(currentState);
        console.log('Asi queda el nuevo estado', currentState);
    },
   
    setMessage (message: string){
        const currentState = this.getState();
        currentState.message = message;
        const newState = this.setState(currentState);
        console.log('Soy el state y me han agregado este mensaje:', message)
    },


    pushMessage(message: string) {
       fetch(API_URL_BASE + 'chatpage', {
           method: 'post',
           body: JSON.stringify({
               name: this.data.nombre,
               message: message
           })
       })
       const currentState = state.getState();
       console.log('Asi queda con el nuevo mensaje', currentState );
    },

    signIn (){
        const currentState = this.getState();
        console.log(currentState);
        if (currentState.email) {
            fetch(API_URL_BASE + "signup", {
                method: "post",
                headers: {
                    "content-type": "aplication/json",
                },
                body: JSON.stringify({email: currentState.email})
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
            })
        }else {
            console.error("No hay nada")
        }
    },

    setState(newState) {
        this.data = newState;

        // Save the changes made to the state
        // localStorage.setItem('New State', JSON.stringify(this.data));

        for (const cbFunction of this.listener) {
            cbFunction(newState);
        }
    },

    
    suscribe(callback: (any)=> any ){   //recibe una función (callback)
        this.listener.push(callback);   //agrega lo que tiene que hacer el listener. 
        for (const cb of this.listener) {
            cb();
        }
    },
    
};

export {state};
