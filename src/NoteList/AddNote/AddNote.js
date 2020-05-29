import React from 'react'; 
import PropTypes from 'prop-types'; 

class AddNote extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            title: '', 
            content: '', 
        }
    }

    handleNewNote = (e, folderId)=>{
        e.preventDefault(); 

        if(this.state.title){
        

        fetch(`http://localhost:9090/notes/`, {
          method: 'POST', 
          headers: {
            'content-type': 'application/json', 
          },
          body: JSON.stringify({
              name: e.target.title.value, 
              folderId: folderId, 
              modified: new Date(),
              content: e.target.content.value
            })
        }); 

        this.props.handleStateChange(); 
    } else {
        alert('please enter a title')
    }

    }

    render(){

        return (
            <form onSubmit={(e)=>{this.handleNewNote(e, this.props.folderId)}}>
                <legend htmlFor="addNote">Add Note</legend>
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input 
                        name="title" 
                        requierd
                        id="title" 
                        type="text" 
                        placeholder="title"
                        onChange={(e)=>{
                            this.setState({
                                title: e.target.value
                            })}}
                    />
                    <label htmlFor="content">Content</label>
                    <input 
                        name="content" 
                        required 
                        id="content" 
                        type="text" 
                        placeholder="content"
                        onChange={(e)=>{
                            this.setState({
                                content: e.target.value
                            })
                        }}
                    />
                </fieldset>
                {(this.state.title&&this.state.content)&&<button type='submit'>Submit</button>}
            </form>
        )
    }
}

AddNote.propTypes = {
    folderId : PropTypes.string, 
    handleStateChange : PropTypes.func

}

export default AddNote; 