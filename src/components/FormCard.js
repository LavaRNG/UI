import React, { Component} from "react";
import "../App.css";
import { Input } from 'react-materialize';
import ClipLoader from 'react-spinners/BeatLoader';

class FormCard extends Component{

  constructor(props){
    super(props)
    this.state = {
      inputVal: "",
      outputVal: ""
    }
  }

  onChange(name, event) {
    this.setState({...this.state, [name]: event.target.value})
  }

  renderInput() {
    if (this.props.buttonText !== "Request"){
      return (
        <Input label="Enter Number" className="submitForm" onChange={e => this.onChange("inputVal", e) } value={this.state.inputVal} />
      )
    } else {
        return (
        <div style={{marginTop : "100px"}} />
        )
    }
  }

  handleAction(event) {
    if (this.props.buttonText === "Request"){
      //this.props.displayLoader();
      this.props.action();
      return;
    }
   this.props.action(this.state.inputVal);
  }

  renderButton() {
    if (this.props.buttonText === "Request" && this.props.requestSent){
      return ("")
    } else {
      return (
        <div id="button" className="lavaCard lavaRow" onClick={this.handleAction.bind(this)}>
          <h2 id="submitText">{this.props.buttonText}</h2>
        </div>
      )
    }
  }

  showLoader(){
      if (this.props.buttonText == "Request" && this.props.requestSent) {
        return (
          <div style={{marginTop : "-70px"}}>
              <h4>Retrieving your random number.</h4>
              <ClipLoader
              sizeUnit={"px"}
              size={15}
              color={'#123abc'}
              loading={this.state.loading}
            />
         </div>
      )
    }
  }

  showNumberGot() {
    if(this.props.buttonText == "Request" && this.props.requestGot && !this.props.requestSent) {
      return (
        <div style={{marginTop : "-120px"}}>
          <h4>Your number : </h4>
          <h6>{this.props.randomGot}</h6>
        </div>
      )
    }
  }

  render(){
    return(
      <div id="formCard" className="lavaCard">
        <h4>{this.props.title}</h4>
        <hr className="cardRule"></hr>
        <div id="cardContent" className="column">
          {this.renderInput()}
          {this.showLoader()}
          {this.showNumberGot()}
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default FormCard;
