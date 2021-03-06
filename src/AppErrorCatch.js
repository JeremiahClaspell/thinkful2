import React from 'react'; 
class AppErrorCatch extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            hasError: false
        }; 
    }
    static getDerivedStateFromError(error) {
        return {hasError: true}
      }


    render(){
        if(this.state.hasError){
            return (<p>unable to load page</p>)
        }
        return (this.props.children);
    }
}

export default AppErrorCatch; 
