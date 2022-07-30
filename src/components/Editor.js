import React from "react"

export default function Editor(props){

    // const body = <p>{props.currentNote == undefined ? "There's no notes" : props.currentNote.body} </p>

    return (
        <div className="flex-1">
            <div className="px-5 py-1 mt-3">
                {/* <h3 className="mb-2 text-3xl">{props.currentNote.title}</h3> */}
                <input className="mb-2 text-3xl" type="text" name="title" onChange={props.updateChange} value={props.currentNote.title}/>
                <hr />
                <div style={{height: '90vh'}} className="mt-2">
                    <textarea name="body" onChange={props.updateChange} className="resize-none h-full w-full" value={props.currentNote.body} />
                    {console.log(props.currentNote.body)}
                </div>
            </div>
        </div>
    )
}