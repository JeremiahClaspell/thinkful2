import React from 'react'; 
import ContextState from '../ContextState'; 
import './Note.css'; 
import { Link } from 'react-router-dom'; 

function CreateNoteList(folderId){
    return (
        <ContextState.Consumer>
            {({ notes, handleDeleteNote })=>{
                return (

                    notes.filter((note)=>{
                        //if null return all, if matches id only return records that match id
                        if(folderId.props===''){
                            return note; 
                         } else if(folderId.props===note.folderId){
                            return note; 
                        } 
                                                
                    })
                    .map((note)=>{
                        return (
                            <li>
                                <h6><Link to={`/note/${note.id}`}>{note.name}</Link></h6>
                                <div>
                                    <p>{note.modified}</p>
                                    <button onClick={()=>handleDeleteNote(note)}>Delete</button>
                                </div>
                            </li>
                        )
                    })


                )
            }}
        </ContextState.Consumer>
    )
}

export default function NoteList(props){
    return (
        <div className="noteList">
            <ul>
                <CreateNoteList props={props.props===undefined?'':props.props}/>
            </ul>
            <button>Add Note</button>
        </div>
    )
}