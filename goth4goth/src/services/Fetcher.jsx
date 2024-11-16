import {nanoid} from "nanoid";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
    arrayUnion
} from "firebase/firestore";
import {db} from "../App.jsx";

const userID = localStorage.getItem('userID');


export class FetcherService {


    listen(roomID, setMessages, setRoom){
        const docRef = doc(db, "room", roomID);

        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const roomData = docSnap.data();
                if (roomData.messages) {
                    //const sortedMessages = roomData.messages.sort((a, b) => a.createAt.toDate() - b.createAt.toDate());
                    setMessages(roomData.messages);
                }
                setRoom(roomData);
            }
        }, (err) => {
            console.log(err);
        });
    }
    async createUser(user){
        user.id = nanoid();
        return await addDoc(collection(db, "user"), {
            user: user,
        });
    }

    async getRoomAvailable(){
        const roomsQuery = query(
            collection(db, "room"),
            where("guest", "==", null)
        );

        const querySnapshot = await getDocs(roomsQuery);

        let newData = [];
        querySnapshot.forEach((doc) => {
            newData.push({...doc.data()});
        });
        let currentUser = newData.filter(value => value.creator.id === userID);
        if(currentUser.length > 0){
            let currentUserID = newData.indexOf(currentUser[0]);
            newData.splice(currentUserID, 1);
        }
        return newData;
    }

    async getCurrentUser(){
        let roomSnapshot =  await this.getUser(userID);
        if(!roomSnapshot.exists()) return;
        return { id: roomSnapshot.id, ...roomSnapshot.data() };

    }
    async getUser(userID){
        return await getDoc(doc(db, "user", userID));
    }
    async getCurrentUsersOnline(){
        return await getDocs(collection(db, "user")).then((querySnapshot)=>{
            return querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        });
    }
    async deleteCurrentUser(){
        const docRef = doc(db, 'user', userID)
        await deleteDoc(docRef);
    }

    async deleteRoom(roomID){
        const docRef = doc(db, 'room', roomID)
        await deleteDoc(docRef);
    }

    async getRoom(roomID){
        let roomSnapshot = await getDoc(doc(db, "room", roomID));
        if(!roomSnapshot.exists()) return;
        return { id: roomSnapshot.id, ...roomSnapshot.data() };

    }
    async enterRoom(roomID){
        let guest = await this.getCurrentUser();
        console.log(guest);
        const roomDocRef = doc(collection(db, 'room'), roomID);
        await updateDoc(roomDocRef, {['guest'] : guest});
        return this.getRoom(roomID);
    }

    async exitRoom(roomID){
        const roomDocRef = doc(collection(db, 'room'), roomID);
        await updateDoc(roomDocRef, {['guest'] : null});
        return this.getRoom(roomID);
    }

    async createRoom(){
        let creator = await this.getCurrentUser();
        let room = {
            'id' : nanoid(),
            'creator' : creator,
            'guest' : null,
            'messages' : []
        };
        const roomDocRef = doc(db, 'room', room.id);
        await setDoc(roomDocRef, room);
        return room;
    }

    async addMessage(roomID, message){
        const roomRef = doc(db, "room", roomID);
        await updateDoc(roomRef, {
            messages: arrayUnion(message)
        });
    }
}