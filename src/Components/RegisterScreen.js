import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import Message from './Message'
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import Loader from './Loader'
import axios from 'axios'

const RegisterScreen = ({ location, history }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState(null)
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })


    // useEffect(() => {
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
        const geoDetails = [coordinates.lat, coordinates.lng]
        const req = await axios.post(`https://testdepot-app.herokuapp.com/api/users/register`, { fullName, email, phone, password, address, geoDetails })
        localStorage.setItem('logindetails', JSON.stringify(req))
        history.push('/')
    }
    const handleSelect = async address => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        setAddress(address)
        setCoordinates(latLng)
    };

    const handleChange = address => {
        setAddress(address);
    };
    return (
        <Container>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Full Name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control {...getInputProps({
                                placeholder: 'Enter Address',
                                className: 'location-search-input',
                            })} />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Form.Group>
                    )}
                </PlacesAutocomplete>
                <Button type="submit" variant="primary"> Register </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have An Account? {' '}
                    <Link to='/'>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
