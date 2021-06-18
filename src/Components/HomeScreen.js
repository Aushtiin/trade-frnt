import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Product from './Product'
import Loader from './Loader'
import axios from 'axios'
import UploadProductModal from './UploadProductModal';
import Message from './Message'
import { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

const HomeScreen = ({history}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [fileUrl, setFileUrl] = useState(null)
    const [distanceInMeters, setDistanceInMeters] = useState(Number)
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })
    const [subLoading, setSubLoading] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ])
    const details = localStorage.getItem('logindetails') ? JSON.parse(localStorage.getItem('logindetails')) : null
    const getProducts = async () => {
        setLoading(true)
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products`, config)
        setProducts(data.data)
        setLoading(false)
    }

    const handleSelect = async address => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        setAddress(address)
        setCoordinates(latLng)
    };

    const submit = async (e) => {
        try{
        e.preventDefault();
        setSubLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        const geoDetails = [coordinates.lat, coordinates.lng]
        await axios.post(`https://testdepot-app.herokuapp.com/api/products/new`, {name, address, distanceInMeters, image: fileUrl, geoDetails}, config)
        setShow(false)
        setSubLoading(false)
        getProducts()
        e.target.reset()
    } catch (e) {
        console.log(e)
        setSubLoading(false)
        setError('An error occured, please try again')
    }
    }

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem('logindetails')
        history.push('/')
    }
    return (
        <Container>
            <h1 className='my-3'>Products Close to you</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button className='mb-3' onClick={() => setShow(true)}>Upload Product</Button>
            <Button className='mb-3 ml-auto' onClick={logout}>Logout</Button>
            </div>
            <UploadProductModal 
            name={name} 
            setName={setName} 
            setFileUrl={setFileUrl} 
            address={address} 
            handleSelect={handleSelect} 
            handleChange={setAddress} 
            show={show} 
            setShow={setShow}
            distanceInMeters={distanceInMeters}
            setDistanceInMeters={setDistanceInMeters}
            submit={submit}
            subLoading={subLoading}
            error={error}
            />
            {loading ?
                <Loader /> :
                products.length < 1 ?
                <Message>{`There are no products around you.`}</Message> :
                <Row>
                    {products.map((product, ind) => (
                        <Col key={ind} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>}
        </Container>
    )
}

export default HomeScreen
