import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap';
import Loader from './Loader'
import axios from 'axios';
import Comment from './Comment';

const ProductScreen = ({ history, match }) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [ text, setText ] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        getProduct(match.params.id)
    }, [match])

    const productId = match.params.id
    const details = localStorage.getItem('logindetails') ? JSON.parse(localStorage.getItem('logindetails')) : null

    const getProduct = async (id) => {
        setLoading(true)
        const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products/${id}`)
        getComments(id)
        setLoading(false)
        setProduct(data.data)
    }

    const getComments = async (id) => {
        const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products/comments/${id}`)
        setComments(data.data)
    }

    const submit =async e => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        await axios.post(`https://testdepot-app.herokuapp.com/api/products/comment`, {body, productId}, config)
        setBody('')
        getComments(productId)
    }
    return (
        <Container>
            <Link className="btn btn-light" to="/products">
                Go Back
            </Link>

            {loading ?
                <Loader /> :
                <Row>
                    <Col md={3}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <h3>{product.name}</h3>
                        <Form onSubmit={submit}>
                            <h5>Leave a comment</h5>
                            <Form.Group>
                                <Form.Label>Your Comment</Form.Label>
                                <Form.Control value={body} type='text' onChange={e => setBody(e.target.value)} />
                            </Form.Group>
                            <Button type='submit'>post</Button>
                        </Form>
                    </Col>
                    <Col md={5}>
                        <h6>Comments</h6>
                        <Card>
                            <ListGroup variant='flush'>
                                {comments.map((comment, ind) => (
                                    <Comment getComments={getComments} key={ind} productId={match.params.id} comment={comment} value={text} setValue={setText} />
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default ProductScreen
