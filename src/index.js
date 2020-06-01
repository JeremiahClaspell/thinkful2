import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ContextState from "./ContextState";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";
import AppErrorCatch from "./AppErrorCatch";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: "",
      handleFolderSelect: this.handleFolderSelect,
      handleDeleteNote: this.handleDeleteNote,
      folders: [],
      notes: [],
      addFolder: "",
      addNoteTitle: "",
      handleFolderState: (e) => {
        this.setState({
          addFolder: e.target.value,
        });
      },

      handleSubmitFolder: (e) => {
        e.preventDefault();

        if (this.state.addFolder) {
          fetch(`http://localhost:9090/folders/`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ name: e.target.folder.value }),
          });
          let folder = [];
          const Folders = fetch("http://localhost:9090/folders")
            .then((response) => response.json())
            .then((responseJson) => {
              folder = responseJson;
            })
            .then(() => {
              this.setState({ folders: folder });
            })
            .catch((e) => {
              alert("something went wrong");
            });
        } else {
          alert("Please enter folder name");
        }
      },

      handleSubmitNote: (e, folderId) => {
        e.preventDefault();

        if (e.target.title.value) {
          fetch(`http://localhost:9090/notes/`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: e.target.title.value,
              folderId: folderId,
              modified: new Date(),
              content: e.target.content.value,
            }),
          });
          let note = [];
          const Notes = fetch("http://localhost:9090/notes")
            .then((response) => response.json())
            .then((responseJson) => {
              note = responseJson;
            })
            .then(() => {
              this.setState({ notes: note });
            })
            .catch((e) => {
              alert("something went wrong");
            });
        } else {
          alert("Please enter folder name");
        }
      },
    };
  }

  componentDidMount() {
    let folder = [];
    const Folders = new Promise((resolve, reject) => {
      fetch("http://localhost:9090/folders")
        .then((response) => response.json())
        .then((responseJson) => {
          folder = responseJson;
        })
        .then(() => {
          resolve();
        })
        .catch((e) => {
          alert("something went wrong");
        });
    });

    let note = [];
    const Notes = new Promise((resolve, reject) => {
      fetch("http://localhost:9090/notes")
        .then((response) => response.json())
        .then((responseJson) => {
          note = responseJson;
        })
        .then(() => {
          resolve();
        })
        .catch((e) => {
          alert("something went wrong");
        });
    });

    Promise.all([Folders, Notes]).then(() => {
      this.setState({
        folders: folder,
        notes: note,
      });
    });
  }

  handleFolderSelect = (folder) => {
    folder === this.state.folder
      ? this.setState({
          folder: "",
        })
      : this.setState({
          folder: folder,
        });
  };

  handleDeleteNote = (deleteNote) => {
    fetch(`http://localhost:9090/notes/${deleteNote.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).catch(() => {
      alert("something went wrong");
    });

    const newNotes = this.state.notes.filter((note) => {
      return note !== deleteNote;
    });
    this.setState({
      notes: newNotes,
    });
  };

  render() {
    return (
      <AppErrorCatch>
        <ContextState.Provider value={this.state}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <App state={this.state} />}
              />
              <Route exact path="/folder/:id" component={Folder} />
              <Route exact path="/note/:id" component={Note} />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </ContextState.Provider>
      </AppErrorCatch>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
