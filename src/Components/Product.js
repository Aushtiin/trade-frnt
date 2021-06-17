import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant='top' src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product
