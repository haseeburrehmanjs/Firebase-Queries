import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyARdKmjC_K-kDB74cZncuzJAtkX4fnd_UI",
    authDomain: "todoappwithfirebasequrey.firebaseapp.com",
    projectId: "todoappwithfirebasequrey",
    storageBucket: "todoappwithfirebasequrey.appspot.com",
    messagingSenderId: "772177447320",
    appId: "1:772177447320:web:a13c1bcd59202e438ec3ed",
    measurementId: "G-RGRS27563P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// html element use in javascript
let form = document.querySelector("#form")
let list = document.querySelector("#list")
let input = document.querySelector("#todo")
let select = document.querySelector("#select")
let filterBtn = document.querySelectorAll(".filterBtn")

// empty array for push data 
let emptyArray = []

// get data from firestore database
async function getDataFromDb() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        emptyArray.push({ ...doc.data(), id: doc.id })
    });
    renderScreen()
}
getDataFromDb()

// for render screen 
function renderScreen() {
    list.innerHTML = ''
    emptyArray.map((item, index) => {
        list.innerHTML += `
        <li>${item.todo} - ${item.createdAt} <button class="delete">delete</button> <button class="edit">edit</button></li>`

        let delete_Btn = document.querySelectorAll('.delete')
        let edit_btn = document.querySelectorAll('.edit')

        // delete button
        delete_Btn.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                await deleteDoc(doc(db, "todos", emptyArray[index].id));
                emptyArray.splice(index, 1)
                renderScreen()
            })
        })

        // edit button 
        edit_btn.forEach((btn, index) => {
            btn.addEventListener('click',async () => {
                let ubdateTodo = prompt('enter new todo', emptyArray[index].todo)
                const washingtonRef = doc(db, "todos", emptyArray[index].id);

                await updateDoc(washingtonRef, {
                    todo: ubdateTodo
                });
                if(ubdateTodo && ubdateTodo.trim() !== ''){
                    emptyArray[index].todo = ubdateTodo
                }
                renderScreen()
            })
        })
    })
}
renderScreen()

// get input value and store firestore database
form.addEventListener('submit', async event => {
    event.preventDefault()
    if (input.value === '') {
        alert('please fill input')
    } else {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                todo: input.value,
                createdAt: new Date().toISOString(),
                cities: select.value,
            });
            emptyArray.push({
                todo: input.value,
                createdAt: new Date().toISOString(),
                city: select.value,
                id: docRef.id
            })
            renderScreen()
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        input.value = ''
    }
})















































// filterBtn.forEach((btn, index) => {
//     btn.addEventListener('click', async () => {
//         addTodo= []
//         list.innerHTML = ''
//         const queries = collection(db, "todos");
//         const q = query(queries, where("cities", "==", btn.innerHTML));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             addTodo.push({ ...doc.data(), id: doc.id });
//         });
//         console.log(addTodo);
//         renderScreen()
//     })
// })

// // add todo in array
// let addTodo = []

// // get data from firestore database
// async function getDataFromDb() {
//     const querySnapshot = await getDocs(collection(db, "todos"));
//     querySnapshot.forEach((doc) => {
//         addTodo.push({ ...doc.data(), id: doc.id })
//     });
//     renderScreen()
// }
// getDataFromDb()

// // function for render screen
// function renderScreen() {
//     list.innerHTML = ''
//     addTodo.map((item, index) => {
//         list.innerHTML += `
//         <li>${item.todos} - ${item.createdAt}
//         <button class="deleteBtn">delete</button>
//         <button class="editBtn">edit</button>
//         </li>`

//         let deleteBtn = document.querySelectorAll('.deleteBtn')
//         let editBtn = document.querySelectorAll('.editBtn')

//         deleteBtn.forEach((btn, index) => {
//             btn.addEventListener('click', async () => {
//                 await deleteDoc(doc(db, "todos", addTodo[index].id));
//                 addTodo.splice(index, 1)
//                 renderScreen()
//             })
//         })

//         editBtn.forEach((btn, index) => {
//             btn.addEventListener('click', async () => {
//                 let ubdateValue = prompt('enter todo')
//                 const ubpdateDoc = doc(db, "todos", addTodo[index].id);
//                 await updateDoc(ubpdateDoc, {
//                     todos: ubdateValue
//                 });
//                 addTodo[index].todos = ubdateValue
//                 renderScreen()
//             })
//         })
//     })
// }
// renderScreen()

// // input value push in empty array
// form.addEventListener("submit", async event => {
//     event.preventDefault()
//     if (input.value === '') {
//         alert
//     } else {
//         try {
//             const docRef = await addDoc(collection(db, "todos"), {
//                 todos: input.value,
//                 createdAt: new Date().toISOString(),
//                 cities: select.value,
//             });
//             addTodo.push({
//                 todos: input.value,
//                 createdAt: new Date().toISOString(),
//                 cities: select.value,
//                 id: docRef.id
//             })
//             console.log("Document written with ID: ", docRef.id);
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     }
//     renderScreen()
//     input.value = ''
// })

