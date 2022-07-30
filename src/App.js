import React, {useEffect, useState} from "react"
import {nanoid} from "nanoid"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

import "./style.css"

export default function App(){

    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )

    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function addNote(){
        const newNote = {
            id: nanoid(),
            title: "Note " + (notes.length + 1),
            body: "Note " + (notes.length + 1) + " text goes here..."
        }

        setNotes(prevNotes => ([newNote, ...prevNotes]))
        setCurrentNoteId(newNote.id)
    }

    function deleteNode(noteId){
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }

    function findCurrentNote(){
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function handleChange(event){
        const {name, value} = event.target

        setNotes(oldNotes => {
            const newArray = []

            for(let i = 0; i < oldNotes.length; i++){
                const oldNote = oldNotes[i]

                if(oldNote.id === currentNoteId)
                    newArray.unshift({...oldNote, [name]: value})
                else
                    newArray.push(oldNote)
            }

            return newArray
        })

        // This doesn't re-arrange the array
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId ? {...oldNote, [name]: value}
        //     : oldNote
        // }))
    }

    return (
        notes.length > 0
        ?
        <div className="flex min-h-screen">
            <Sidebar 
                notes={notes}
                addNote={addNote} 
                deleteNode={deleteNode}
                currentNote={findCurrentNote()}
                setCurrentNote={setCurrentNoteId}/>
            <Editor  
                currentNote={findCurrentNote()}
                updateChange={handleChange}/>
        </div>
        :
        <div className="flex h-screen ">
            <div className="flex flex-col justify-center mx-auto">
                <h1 className="text-3xl">You have no notes!</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-900 text-white text-sm font-bold py-2 px-4 rounded"
                    onClick={addNote}>Create one now!</button>
            </div>  
        </div>
    )
}