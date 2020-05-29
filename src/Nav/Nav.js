import React from 'react'; 
import './Nav.css'
import ContextState from '../ContextState';
import { Link } from 'react-router-dom'; 
import AddFolder from '../Folder/AddFolder/AddFolder'; 
import NavErrorCatch from './NavErrorCatch'; 
import PropTypes from 'prop-types'; 


function CreateList(folderId){

    CreateList.propTypes = {
        props : PropTypes.string
    }
    
    return (
        <ContextState.Consumer>
            {({ folders }) =>{
                return (
                    folders.map((folder,i)=>{
                        return (
                            <ContextState.Consumer key={i}>
                                {({ handleFolderSelect })=>{
                                    return (
                                        <Link to={`/folder/${folder.id}`} key={i}>
                                            <li key={i} id={`folder${i}`} onClick={()=>handleFolderSelect(folder.name)} className={folder.id===folderId.props?'selected':null}>{folder.name}</li>
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

class Nav extends React.Component {

    constructor(props){
        super(props); 

        this.state = {
            addFolder: false, 
        }
        this.handleStateChange = this.handleStateChange.bind(this); 
    }

    handleAddFolder(e){
        e.preventDefault(); 
        this.state.addFolder?this.setState({addFolder: false}): this.setState({addFolder: true})
    }

    handleStateChange = (e)=>{
        setTimeout((()=>{
            this.setState({
                addFolder: false
            })
        }),1000)

    }


    
    render(){
        return (
            <NavErrorCatch>
                <div className="list">
                    <ul>
                    <CreateList props={this.props.props}/>
                    </ul>
                    <button onClick={e=>{this.handleAddFolder(e)}}>Add Folder</button>
                    {this.state.addFolder&&<AddFolder handleStateChange={this.handleStateChange}/>}
                </div>
            </NavErrorCatch>

        )
    }
}
Nav.propTypes = {
    props: PropTypes.string
}

export default Nav; 