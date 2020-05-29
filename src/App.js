import React from 'react';
import './App.css';
import Header from './Header/Header'; 
import Nav from './Nav/Nav'; 
import NoteList from './NoteList/NoteList'; 


class App extends React.Component {

  constructor(props){
    super(props); 


  }

  render(){
    return (
            <div className="App">
              <Header/>
              <Nav/>
              <NoteList/>
            </div>


    );
  }
}


export default App;
