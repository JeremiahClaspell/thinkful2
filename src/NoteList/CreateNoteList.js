import React from 'react'; 
import ContextState from '../ContextState'; 
import './Note.css'; 
import { Link } from 'react-router-dom'; 
import AddNote from './AddNote/AddNote'; 
import NoteListErrorCatch from './NoteErrorCatch'
import PropTypes from 'prop-types'


export default function CreateNoteList(folderId){
    CreateNoteList.propTypes = {
        props: PropTypes.string.isRequired
    }

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
                    .map((note,i)=>{
                        return (
                            <li key={`note${i}`}>
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

