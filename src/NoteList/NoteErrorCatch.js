import React from 'react'; 

class NoteListErrorCatch extends React.Component{

    constructor(props){
        super(props); 

        this.state = {
            hasError: false
        }; 
    }

    static getDerivedStateFromError(e){
        return {hasError: true}
    }

    render(){
        if(this.state.hasError){
            return(
                <div className="noteList">
                    <p>Unable to load list</p>
                </div>
            )
        }
        return this.props.children
    }
}

export default NoteListErrorCatch