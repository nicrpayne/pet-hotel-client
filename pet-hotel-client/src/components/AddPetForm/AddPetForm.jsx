import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddPetForm extends Component {

componentDidMount(){
    this.props.dispatch ({
        type: 'GET_PETS'
    })
}


    state = {
        newPet: {
            name: '',
            breed: '',
            color: ''
        }
    }

    handleChangeFor = (propertyName, event) => {
        console.log(event.target.value)
        this.setState({
            newPet: {
                ...this.state.newPet,
                [propertyName]: event.target.value,
                // name: event.target.value.name,
                // breed: event.target.value.breed,
                // color: event.target.value.color
            }
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.props.dispatch({
            type: 'POST_PETS',
            payload: this.state.newPet
        })
    }



    render() {

        return (

            <div>
                <form>
                    <h2>Add Pet </h2>
                    {JSON.Stringify(this.props.reduxState.setPetsReducer)}
                    <input
                        placeholder='Pet Name'
                        value={this.state.newPet.name}
                        onChange={(event) => this.handleChangeFor("name",event)} />
                    <input
                        placeholder='Pet Color'
                        value={this.state.newPet.color}
                        onChange={(event) => this.handleChangeFor("color",event)} />
                    <input
                        placeholder='Pet Breed'
                        value={this.state.newPet.breed}
                        onChange={(event) => this.handleChangeFor("breed",event)} />
                    <select>
                        <options>Add to Pet Hotel:</options>
                    </select>
                    <button onClick={(event) => this.handleClick(event)}>Add Pet</button>
                </form>
            </div>



        )


    }


}

const mapStateToProps = reduxState => {
    return {
        reduxState: reduxState
    }
}
export default connect(mapStateToProps)(AddPetForm)