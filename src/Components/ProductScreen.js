import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap';
import Loader from './Loader'
import axios from 'axios';
import Comment from './Comment';
import Message from './Message'

const ProductScreen = ({ history, match }) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        getProduct(match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])

    const productId = match.params.id
    const details = localStorage.getItem('logindetails') ? JSON.parse(localStorage.getItem('logindetails')) : null

    const getProduct = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products/${id}`)
            getComments(id)
            setLoading(false)
            setProduct(data.data)
        } catch (e) {
            console.error(e)
            setError('An error occured')
            setLoading(false)
        }
    }

    const getComments = async (id) => {
        const { data } = await axios.get(`https://testdepot-app.herokuapp.com/api/products/comments/${id}`)
        setComments(data.data)
    }

    const submit = async e => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${details.data.token}`
            }
        }
        await axios.post(`https://testdepot-app.herokuapp.com/api/products/comment`, { body, productId }, config)
        setBody('')
        getComments(productId)
    }
    return (
        <Container>
            <Link className="btn btn-light my-3" to="/products">
                Go Back
            </Link>
            {error && <Message>{error}</Message>}
            {loading ?
                <Loader /> :
                <Row>
                    <Col md={3}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <h3 className='my-3'>{product.name}</h3>
                        <Form onSubmit={submit}>
                            <Form.Group>
                                <Form.Label>Leave a comment</Form.Label>
                                <Form.Control value={body} type='text' onChange={e => setBody(e.target.value)} />
                            </Form.Group>
                            <Button className='mb-3' type='submit'>post</Button>
                        </Form>
                    </Col>
                    <Col md={5}>
                        <h6>Comments</h6>
                        <Card className='my-3'>
                            <ListGroup variant='flush'>
                                { comments.length < 1 ? <Message>No comments yet</Message> :
                                comments.map((comment, ind) => (
                                    <Comment
                                        getComments={getComments}
                                        key={ind}
                                        productId={match.params.id}
                                        comment={comment}
                                        value={text}
                                        setValue={setText}
                                    />
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
