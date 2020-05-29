import React from 'react'; 

class NoteErrorCatch extends React.Component{

    constructor(props){
        super(props); 

        this.state={
            hasError: false
        }; 
    }

    static getDerivedStateFromError(e){
        return ({hasError: true})
    }

  render(){
      if(this.state.hasError){
        return(<p>unable to load note</p>)
      }
      return(this.props.children)
  }
}

export default NoteErrorCatch