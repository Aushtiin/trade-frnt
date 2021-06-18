import React, { useState } from 'react'
import { Form, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'

const Comment = ({ comment, productId, getComments }) => {
  const [reply, setReply] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [body, setBody] = useState('')

  const details = localStorage.getItem('logindetails') ? JSON.parse(localStorage.getItem('logindetails')) : null
  const submit = async e => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${details.data.token}`
      }
    }
    await axios.post(`https://testdepot-app.herokuapp.com/api/products/comment`, { body, commentId: comment._id, productId }, config)
    setReply(false)
    setBody('')
    getComments(productId)
  }

  return (
    <ListGroup.Item key={comment._id}>
      <>
        <span>{comment.body}</span> <br />
        <small>from: {comment.createdBy.fullName}</small>
        <div className="reply">
          <span onClick={() => setReply(prev => !prev)}>reply</span>
          {comment.replies.length > 0 &&
            <span
              onClick={() => setShowReplies(prev => !prev)}
              id='show'
            >
              {showReplies ? 'hide replies' : 'show replies'}
            </span>}
        </div>
        {showReplies &&
          <ListGroup>
            {comment.replies.map((reply, ind) => (
              <ListGroup.Item key={ind}>
                {reply.body}
              </ListGroup.Item>
            ))}
          </ListGroup>}
        {
          reply && <div>
            <Form onSubmit={submit}>
              <Form.Control className='my-3' value={body} onChange={e => setBody(e.target.value)} type="text" />
              <Button type="submit">Reply</Button>
            </Form>
          </div>
        }
      </>
    </ListGroup.Item>
  )
}

export default Comment
