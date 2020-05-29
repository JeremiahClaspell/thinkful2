import React from 'react'; 

class NavErrorCatch extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    render(){
        if(this.state.hasError){
            return(
            <p>Unable to load Nav</p>
            )
        }
        return (
            this.props.children
        )
    }
}

export default NavErrorCatch