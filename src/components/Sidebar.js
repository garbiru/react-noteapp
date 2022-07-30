import React from "react"

export default function Sidebar(props){

    const notesJSX = props.notes.map((note, index) => {
        return <div key={note.id}
                    className={`group flex cursor-pointer px-4 py-3 bg-${note.id === props.currentNote.id ? "blue-300" : "white"}`}
                    onClick={() => props.setCurrentNote(note.id)}>
                    
                    {note.title}
                    <button className="text-base text-blue-900 font-bold ml-auto hidden group-hover:block px-3" onClick={() => props.deleteNode(note.id)}>X</button>
                </div>
    })

    return (
        <div className="w-64 bg-gray-50 border-r border-gray-200">
            <div className="py-4 px-6 flex">
                <p className="font-montserrat text-3xl text-blue-900">NOTES</p>
                <button className="bg-blue-500 hover:bg-blue-900 text-white text-sm font-bold py-2 px-4 ml-auto rounded"
                        onClick={props.addNote}>Add</button>
            </div>
            {notesJSX}
        </div>
    )
}