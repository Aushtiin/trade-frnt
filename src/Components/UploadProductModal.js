import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { app } from '../base'
import PlacesAutocomplete from 'react-places-autocomplete';

const UploadProductModal = (props) => {
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    props.setFileUrl(await fileRef.getDownloadURL())
  }


  return (
    <Modal show={props.show} centered>
      <Modal.Header>
        <Modal.Title>Upload Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={props.submit}>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control value={props.name} onChange={(e) => props.setName(e.target.value)} type="text" name='productName' required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Image</Form.Label>
            <Form.Control type='file' required onChange={onFileChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Distance In Meters</Form.Label>
            <Form.Control value={props.distanceInMeters} onChange={(e) => props.setDistanceInMeters(e.target.value)} type="number" required />
          </Form.Group>

          <PlacesAutocomplete
            value={props.address}
            onChange={props.handleChange}
            onSelect={props.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control {...getInputProps({
                  // placeholder: 'Search Places ...',
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
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadProductModal
