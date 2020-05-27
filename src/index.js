import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'
import PageNotFound from './PageNotFound'; 
import ContextState from './ContextState'; 
import Folder from './Folder/Folder'; 
import Note from './Note/Note'



class Index extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      folder: '',
      handleFolderSelect: this.handleFolderSelect, 
      handleDeleteNote: this.handleDeleteNote, 
      folders: [], 
      notes: [], 
    }; 
  }

  componentDidMount(){

    let folder=[]
    const Folders = new Promise((resolve, reject)=>{
      fetch('http://localhost:9090/folders')
      .then((response)=>response.json())
      .then((responseJson)=>{folder=responseJson})
      .then(()=>{resolve()}); 
    })

    let note=[]
    const Notes = new Promise((resolve, reject)=>{
      fetch('http://localhost:9090/notes')
      .then((response)=>response.json())
      .then((responseJson)=>{note=responseJson})
      .then(()=>{resolve()}); 
    })

    Promise.all([Folders, Notes])
      .then(()=>{
        this.setState({
          folders: folder, 
          notes: note, 
        })
      })
  }

  handleFolderSelect = (folder)=>{
    folder === this.state.folder? 
    this.setState({
      folder: ''
    }):
    this.setState({
      folder: folder, 
    })
  }


  handleDeleteNote = (deleteNote)=>{

    console.log(deleteNote.id)

    fetch(`http://localhost:9090/notes/${deleteNote.id}`, {
      method: 'DELETE', 
      headers: {
        'content-type': 'application/json'
      }
    }); 

    const newNotes = 
    this.state.notes.filter((note)=>{
      return note!==deleteNote
    })
    this.setState({
      notes: newNotes, 
    }); 

  }

  render(){
    return (
      <ContextState.Provider value={this.state}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={(props)=><App state={this.state}/>}/>
              <Route exact path="/folder/:id" component={Folder}/>
              <Route exact path="/note/:id" component={Note}/>
              <Route component={PageNotFound}/>
            </Switch>
          </BrowserRouter>
      </ContextState.Provider>
    )
  }
}

ReactDOM.render(
 <Index/>,
  document.getElementById('root')
);
