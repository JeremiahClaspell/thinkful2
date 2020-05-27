import React from 'react'; 
import ContextState from '../ContextState'; 
import Nav from '../Nav/Nav'; 
import NoteList from '../NoteList/NoteList'; 
import Header from '../Header/Header'

class Folder extends React.Component{
    
    constructor(props){
        super(props); 
    }


    render(){
        
        const folderId = this.props.match.params.id; 

        return (
            <>
                <Header/>
                <Nav props={folderId}/>
                <NoteList props={folderId}/>
            </>
        )
    }
}

export default Folder; 