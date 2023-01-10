// firebase shit
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';

import React, { useState, useEffect } from 'react';
import boards from './boards';
import "../styles/board.css";
import cross from "../images/cross.png";

import uniqid from 'uniqid';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function compare(a,b){
    if (a.data().time > b.data().time){
        return -1;
    } else{
        return 1;
    }
}
  
function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../images/randos/', false, /\.(png|jpe?g|svg)$/));

const weekDay = ["Sun", "Mon", "Tue", "Thu", "Wed", "Fri", "Sat"]

function Board(){
    // rolling for rando iamge
    const rndInt = randomIntFromInterval(1,3);

    // getting current board
    console.log(window.location.href);
    const boardId = window.location.href.split("/").at(-1);
    console.log(`you are now at ${boardId}`);
    const board = boards[boardId];

    // load up the database
    const db = getFirestore();
    const dbref = collection(db, boardId);

    // load up the image storage
    const storage = getStorage();
    

    // to initialize all elements
    useEffect(()=>{
        // element selectors
        const navbar = document.querySelector("#navbar");
        const leftNav = document.querySelector("#leftNav");
        const rightNav = document.querySelector("#rightNav");
        const rando = document.querySelector("#rando");
        const threads = document.querySelector("#threads");

        const removePopup = async(popupId) =>{
            threads.removeChild(document.querySelector(`#${popupId}`));
        }

        const sendReply = async(popupId, threadId, docId) =>{
            const popup = document.querySelector(`#${popupId}`);
            let fileId = 0;
            console.log("sending....")
            console.log(popup.elements["file"].files.length);
            if(popup.elements["file"].files.length!==0){
                fileId = uniqid();
                const storageRef = await ref(storage, `${boardId}/${threadId}/${fileId}`);
                await uploadBytes(storageRef, popup.elements["file"].files[0]);
                console.log(`file uploaded to ${boardId}/${threadId}/${fileId}`)
            }
            const threadRef = await collection(db, `${boardId}/${docId}/replies`);
            console.log(`reference created at ${boardId}/${docId}/replies`);
            const time = new Date();
            await addDoc(threadRef, {
                name: (popup.elements["name"].value!=="") ? popup.elements["name"].value : "Anonymous",
                date: `${time.toLocaleDateString()}(${weekDay[time.getDay()]})${time.toLocaleTimeString()}`,
                comment: popup.elements["comment"].value,
                file: fileId,
                fileName: (fileId) ? popup.elements["file"].value.split("\\").at(-1):0,
                id: uniqid(),
                messageId: randomIntFromInterval(387962515,487962515),
                time: time.getTime()
            });
            threads.removeChild(document.querySelector(`#${popupId}`));
        }

        const makeReply = async(messageId, threadId, docId) => {
            console.log(`${messageId} is clicked`);
            const popupId = uniqid();
            const popup = document.createElement("form");
            popup.className = "popup";
            popup.classList.add(`${threadId}`);
            popup.id = popupId;
            popup.setAttribute("onsubmit", "return false")
            popup.innerHTML = 
            `
            <div class = "info">
                <span>Reply to Thread No.${messageId}</span>
                <img src = ${cross} alt = "cross" id = "${popupId}cross">
            </div>
            <input type = "text" name = "name" placeholder = "Name" class = "nameInput">
            <textarea required name = "comment" rows = "4">>>${messageId}</textarea>
            <input type = "file" accept="image/*" name = "file">
            <button id = "${popupId}submit">Post</button>
            `
            threads.appendChild(popup)
            document.querySelector(`#${popupId}cross`).addEventListener("click", ()=>{removePopup(popupId)});
            document.querySelector(`#${popupId}submit`).addEventListener("click", ()=>{sendReply(popupId, threadId, docId)});
        }

        const loadThreads = async() => {
            const querySnapshot = await getDocs(dbref ,orderBy("time"));
            let threadList = [...querySnapshot.docs];
            threadList.sort(compare);
            for(let doc of threadList){
                console.log(doc.id, "=>", doc.data());
                const threadData = doc.data();
                const imgRef = await ref(storage, `${boardId}/${threadData.id}/${threadData.file}`);
                const imgUrl =  await getDownloadURL(imgRef);
                const thread = document.createElement("div");
                thread.id = doc.id;
                thread.innerHTML = `
                <div>
                    <div class = "fileInfo">File: <a href = ${imgUrl} class = "a img">${threadData.fileName}</a></div>
                    <img src = ${imgUrl} alt = ${threadData.fileName} class = "thumbnail">
                    <div class = "threadInfo thread" id = "${threadData.id}info">
                        <div class = "stats">
                            <span class = "subject">${threadData.subject}</span> 
                            <span class = "name">${threadData.name}</span>
                            <span class = "date">${threadData.date}</span>
                            <a class = "messageId" id = "${threadData.id}">No.${threadData.messageId}</a>
                        </div>
                        <div>${threadData.comment}</div>
                    </div>
                    <hr class = "bar">
                </div>
                `
                threads.appendChild(thread);
                console.log(`${threadData.fileName} added`)
                document.querySelector(`#${threadData.id}`).addEventListener('click', ()=>{
                    makeReply(threadData.messageId, threadData.id, doc.id);
                });
                const queryReplies = await getDocs(collection(db, `${boardId}/${doc.id}/replies`));
                let replies = [...queryReplies.docs];
                replies.sort(compare);
                for (let rep of replies){
                    console.log("reply ", rep.id, "=>", rep.data());
                    const repData = rep.data();
                    const reply = document.createElement("div");
                    reply.className = "reply";
                    if (repData.file !== 0){
                        const repImgRef = await ref(storage, `${boardId}/${threadData.id}/${repData.file}`);
                        const repImgUrl = await getDownloadURL(repImgRef);
                        reply.innerHTML += `
                        <div class = "fileInfo">File: <a href = ${repImgUrl} class = "a img">${repData.fileName}</a></div>
                        <img src = ${repImgUrl} alt = ${repData.fileName} class = "thumbnail">
                        `
                    }
                    reply.innerHTML += `
                        <div class = "threadInfo">
                            <div class = "stats">
                                <input type = "checkbox">
                                <span class = "name">${repData.name}</span>
                                <span class = "date">&nbsp${repData.date}</span>
                                <a class = "messageId" id = "${repData.id}">&nbspNo.${repData.messageId}</a>
                            </div>
                            <div class = "comment">${repData.comment}</div>
                        </div>
                    `
                    const container = document.createElement("div");
                    container.className = "container";
                    container.innerHTML = `<div class = "arrow">>></div>`;
                    container.appendChild(reply);
                    const threadInfoPlace = document.querySelector(`#${threadData.id}info`);
                    threadInfoPlace.after(container)
                    document.querySelector(`#${repData.id}`).addEventListener('click', ()=>{
                        makeReply(repData.messageId, threadData.id, doc.id);
                    });
                    console.log("reply added!")
                }
            }
            console.log("threads added!");
        }

        // list of boards for rendering navbar
        const boardList = Object.keys(boards);
        boardList.sort();
        leftNav.innerHTML += "[";
        for (let b of boardList){
            const bLink = document.createElement("a");
            bLink.setAttribute("href", `#/board/${b}`);
            bLink.textContent = `${b}`;
            leftNav.appendChild(bLink);
            if(b !== boardList[boardList.length-1])leftNav.innerHTML += "&nbsp/&nbsp";
        }
        leftNav.innerHTML += "]";

        // loads the threads
        loadThreads();

        return (()=>{
            threads.innerHTML = "";
            leftNav.innerHTML = "";
        });
    });

    // adding new thread
    useEffect(()=>{
        const newThread = document.querySelector("#newThread");
        const newThreadContainer = document.querySelector("#newThreadContainer");
        
        const threadForm = document.createElement("form");
        threadForm.id = "threadForm";
        threadForm.setAttribute("onsubmit", "return false");

        const sendForm = async ()=>{
            if (threadForm.elements["file"].files.length===0 ||threadForm.elements["subject"].value==="") return;
            console.log("sending form...");
            const fileId = uniqid();
            const threadId = uniqid();
            const storageRef = ref(storage, `${boardId}/${threadId}/${fileId}`);
            const snapshot = await uploadBytes(storageRef, threadForm.elements["file"].files[0]);
            const time = new Date();
            console.log("this is the file?", threadForm.elements["file"].files[0]);
            await addDoc(dbref, {
                name: (threadForm.elements["name"].value!=="") ? threadForm.elements["name"].value : "Anonymous",
                subject: threadForm.elements["subject"].value,
                comment: threadForm.elements["comment"].value,
                file: fileId,
                fileName: threadForm.elements["file"].value.split("\\").at(-1),
                id: threadId,
                messageId: randomIntFromInterval(387962515,487962515),
                date: `${time.toLocaleDateString()}(${weekDay[time.getDay()]})${time.toLocaleTimeString()}`,
                time: time.getTime()
            });
            console.log("sent!");
            newThreadContainer.innerHTML = '[<a id = "newThread">Start a New Thread</a>]';
            document.querySelector("#newThread").addEventListener("click", makeThread);
        }

        const makeThread = async() => {
            newThreadContainer.innerHTML = "";
            threadForm.innerHTML = `
            <div id = "nameDiv">
                <span class = "label">Name</span>
                <input type = "text" id = "name" name = "name" placeholder = "Anonymous" class = "textInput">
            </div>
            <div id = "subjectDiv">
                <span class = "label">Subject</span>
                <input type = "text" id = "subject" name = "subject" class = "textInput" required>
            </div>
            <div id = "commentDiv">
                <span class = "label">Comment</span>
                <textarea type = "text" rows = "5" id = "comment" name = "comment" class = "textInput"></textarea>
            </div>
            <div id = "fileDiv">
                <span class = "label">File</span>
                <input type="file" name="file" id="file" accept="image/*" required>
            </div>
            <button id = "submit" type = "submit">Post</button>
            `
            newThreadContainer.appendChild(threadForm);
            const submitButton = document.querySelector("#submit");
            submitButton.addEventListener("click", sendForm);
        };

        newThread.addEventListener("click", makeThread);
        return (()=>{
            newThreadContainer.innerHTML = '[<a id = "newThread">Start a New Thread</a>]';
        });
    },[]);

    return (
        <div className = "page" id = {boardId}>
            <div id = "navbar">
                <div id = "leftNav"></div>
                <div id = "rightNav">[<a href = "#/home">Home</a>]</div>
            </div>
            <div id = "rando" style = {{backgroundImage:`url(./randos/${rndInt}.png)`}}></div>
            <div id = "intro">/{boardId}/ - {board.name}</div>
            <hr class = "bar" id = "divOne"/>
            <div id = "newThreadContainer">[<a id = "newThread">Start a New Thread</a>]</div>
            <hr class = "bar" id = "divTwo"/>
            <div id = "updates">
                <div>07/22/22 New boards added: <a href = "#/board/vg" class = "a">/vg/</a></div>
                <div>07/19/22 New boards added: <a href = "#/board/b" class = "a">/b/</a>, <a href = "#/board/pol" class = "a">/pol/</a></div>
                <div>07/18/22 Genesis: website is created</div>
            </div>
            <hr class = "bar" id = "divThree"/>
            <hr class = "bar" id = "divFour"/>
            <div id = "menu"><input placeholder = "Search OPs..." id = "catalogSearch"/> [<a class = "a">Catalog</a>] [<a class = "a">Archive</a>]</div>
            <hr class = "bar" id = "divFive"/>
            <div id = "threads"></div>
        </div>
    );
}
export default Board;
