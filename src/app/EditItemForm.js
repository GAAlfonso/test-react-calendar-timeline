'use client';
import React from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditItemForm = ({ editingItem, handleEditInputChange, handleUpdateItem, handleDeleteItems }) => {
  return (
    editingItem && (
      <div>
        <h3 className='ms-5'>Edit Item</h3>
        <Form>
          <Form.Group as={Row} controlId="formTitle">
            <Form.Label column sm={2} className='ms-4 mb-1'>Title</Form.Label>
            <Col sm={6} md={4}>
              <Form.Control
                type="text"
                name="title"
                value={editingItem.title}
                onChange={(e) => handleEditInputChange(e)}
                placeholder="Enter item title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formStartTime">
            <Form.Label column sm={2} className='ms-4 mb-1'>Start Time</Form.Label>
            <Col sm={6} md={4}>
              <Form.Control
                type="datetime-local"
                name="start_time"
                value={editingItem.start_time.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => handleEditInputChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEndTime">
            <Form.Label column sm={2} className='ms-4 mb-1'>End Time</Form.Label>
            <Col sm={6} md={4}>
              <Form.Control
                type="datetime-local"
                name="end_time"
                value={editingItem.end_time.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => handleEditInputChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button className='ms-4 mb-1' variant="primary" type="button" onClick={(e) => handleUpdateItem(e)}>
                Update Item
              </Button>
              
              <Button className='ms-2 mb-1' variant="secondary" type="button" onClick={() => handleDeleteItems(editingItem.id)}>
                Delete Item
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  );
};

export default EditItemForm;
