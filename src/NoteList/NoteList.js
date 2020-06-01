import React from "react";
import ContextState from "../ContextState";
import "./Note.css";
import { Link } from "react-router-dom";
import AddNote from "./AddNote/AddNote";
import NoteListErrorCatch from "./NoteErrorCatch";
import CreateNoteList from "./CreateNoteList";
import PropTypes from "prop-types";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNote: false,
    };
  }

  handleStateChange = () => {
    this.state.displayNote
      ? this.setState({ displayNote: false })
      : this.setState({ displayNote: true });
  };

  render() {
    return (
      <NoteListErrorCatch>
        <div className="noteList">
          <ul>
            <CreateNoteList
              props={this.props.props === undefined ? "" : this.props.props}
            />
          </ul>
          {this.props.props && (
            <button
              onClick={() => {
                this.handleStateChange();
              }}
            >
              Add Note
            </button>
          )}
          {this.state.displayNote && (
            <AddNote
              folderId={this.props.props}
              handleStateChange={this.handleStateChange}
            />
          )}
        </div>
      </NoteListErrorCatch>
    );
  }
}

NoteList.propTypes = {
  props: PropTypes.string,
};

export default NoteList;
