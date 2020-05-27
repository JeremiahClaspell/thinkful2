import React from 'react'; 
import './Nav.css'
import ContextState from '../ContextState';
import { Link } from 'react-router-dom'; 


function CreateList(folderId){
    
    return (
        <ContextState.Consumer>
            {({ folders }) =>{
                return (
                    folders.map((folder)=>{
                        return (
                            <ContextState.Consumer>
                                {({ handleFolderSelect })=>{
                                    return (
                                        <Link to={`/folder/${folder.id}`}>
                                            <li onClick={()=>handleFolderSelect(folder.name)} className={folder.id===folderId.props?'selected':null}>{folder.name}</li>
                                        </Link>
                                    )
                                }}
                            </ContextState.Consumer>
                        )
                    })
                )
            }}
        </ContextState.Consumer>
    )

}

//when you click the name of the folder, if the folder is not currently selected route to page that shows those notes

export default function Nav(props){
    return (
        <div className="list">
            <ul>
            <CreateList props={props.props}/>
            </ul>
            <button>Add Folder</button>
        </div>
    )
}