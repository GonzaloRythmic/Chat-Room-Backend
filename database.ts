import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "'w52IIbHhAc4BgvzJJennld8PDMvQsvqkRK0nSMcM'",
    authDomain: "dwf-mod6-333cf.firebaseapp.com",
    databaseURL: 'https://dwf-mod6-333cf-default-rtdb.firebaseio.com/',
    projectId: 'dwf-mod6-333cf',
};

const firebaseApp = initializeApp(firebaseConfig);
const rtdb = getDatabase(firebaseApp)//RTDB//
const chatRoomRef = ref(rtdb, 'chatrooms'); //Reference to the RTDB//
export {rtdb, chatRoomRef};
