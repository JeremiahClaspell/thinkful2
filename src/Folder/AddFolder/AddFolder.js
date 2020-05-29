import React from 'react'; 
import PropTypes from 'prop-types'; 

class AddFolder extends React.Component{
    
    constructor(props){
        super(props); 
        this.state = {
            folder: ''
        }
    }

    handleSubmit(e){
        e.preventDefault(); 

        if(this.state.folder){
        fetch(`http://localhost:9090/folders/`, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json', 
        },
        body: JSON.stringify({'name': e.target.folder.value})
        }); 

    this.props.handleStateChange(); 
        } else {
            alert('Please enter folder name')
        }
    }

    render(){
        return (
        <form onSubmit={e=>{this.handleSubmit(e)}}>
            <label htmlFor="folder">Folder Name</label>
            <input  
                placeholder="folderName" 
                type='text' 
                name='folder' 
                id='name'
                onChange={(e)=>{
                    this.setState({
                        folder: e.target.value
                    })
                }}
            />
            {this.state.folder&&<button type="submit">Submit</button>}
        </form>
        )
                
   
    }
}

AddFolder.propTypes = {
    handleStateChange : PropTypes.func
}

export default AddFolder; 