import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Product from './Product'
import Loader from './Loader'
import axios from 'axios'
import UploadProductModal from './UploadProductModal';
import { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

const HomeScreen = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [autoComplete, setAutoComplete] = useState(null)
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [fileUrl, setFileUrl] = useState(null)
    const [distanceInMeters, setDistanceInMeters] = useState(Number)


    useEffect(() => {
        getProducts()
    }, [ ])
    const details = localStorage.getItem('logindetails') ? JSON.parse(localStorage.getItem('logindetails')) : null
    const getProducts = async () => {
        setLoading(true)
        
        // console.log(details.data.token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products`, config)
        console.log(data)
        setProducts(data.data)
        setLoading(false)
    }

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    const handleChange = address => {
        setAddress(address);
    };

    const submit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        await axios.post(`https://testdepot-app.herokuapp.com/api/products/new`, {name, address, distanceInMeters, image: fileUrl, }, config)
        setShow(false)
    }
    return (
        <Container>
            <h1>Products Close to you</h1>
            <Button onClick={() => setShow(true)}>Upload Product</Button>
            <UploadProductModal 
            name={name} 
            setName={setName} 
            setFileUrl={setFileUrl} 
            address={address} 
            handleSelect={handleSelect} 
            handleChange={handleChange} 
            show={show} 
            setShow={setShow}
            distanceInMeters={distanceInMeters}
            setDistanceInMeters={setDistanceInMeters}
            submit={submit}
            />
            {loading ?
                <Loader /> :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>}
        </Container>
    )
}

export default HomeScreen
