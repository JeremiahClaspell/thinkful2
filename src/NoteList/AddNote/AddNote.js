import React from "react";
import PropTypes from "prop-types";
import ContextState from "../../ContextState";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }

  render() {
    return (
      <ContextState.Consumer>
        {({ handleSubmitNote }) => {
          return (
            <form
              onSubmit={(e) => {
                handleSubmitNote(e, this.props.folderId);
                this.props.handleStateChange();
              }}
            >
              <legend htmlFor="addNote">Add Note</legend>
              <fieldset>
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  requierd
                  id="title"
                  type="text"
                  placeholder="title"
                  onChange={(e) => {
                    this.setState({
                      title: e.target.value,
                    });
                  }}
                />
                <label htmlFor="content">Content</label>
                <input
                  name="content"
                  required
                  id="content"
                  type="text"
                  placeholder="content"
                  onChange={(e) => {
                    this.setState({
                      content: e.target.value,
                    });
                  }}
                />
              </fieldset>
              {this.state.title && this.state.content && (
                <button type="submit">Submit</button>
              )}
            </form>
          );
        }}
      </ContextState.Consumer>
    );
  }
}
AddNote.propTypes = {
  folderId: PropTypes.number,
  handleStateChange: PropTypes.func,
};

export default AddNote;
