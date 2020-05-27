import React from 'react'; 
import ContextState from '../ContextState'; 
import Header from '../Header/Header'; 

function CreateNote(props){
    console.log(props)
    return (
        <ContextState.Consumer>
            {({ notes, folders, handleDeleteNote })=>{
                const note = notes.filter((note)=>{
                    return note.id === props.props.match.params.id? note:[]
                })

                const folder = folders.filter((folder)=>{
                  return(note[0].folderId===folder.id)
                })

                return (
                    <div>
                        <div>
                            <button onClick={props.props.history.goBack}>Go Back</button>
                            <h6>{folder[0].name}</h6>
                        </div>
                        <div>
                            <div>
                                <h4>{note[0].name}</h4>
                                <div>
                                    <p>Date modified {note[0].modified}</p>
                                </div>
                            </div>
                            <div>
                                <p>{note[0].content}</p>
                                <button onClick={()=>{handleDeleteNote(note[0]); props.props.history.goBack()}}>Delete Note</button>
                            </div>
                        </div>

                    </div>

                )
            }}
        </ContextState.Consumer>
    )
}

export default function Note(props){

    return (
        <>
            <Header/>
            <CreateNote props={props}/>
        </>
    )
}

