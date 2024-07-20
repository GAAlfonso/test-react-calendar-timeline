'user client'
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewItemForm = ({newItem, newGroup, groups, handleInputChange, handleGroupInputChange, handleAddItem, handleAddGroup}) =>{
    return (
        <div>
          <Form>
            <Form.Group as={Row} controlId="formTitle">
              <Form.Label column sm={2} className='ms-4 mb-1'>Title</Form.Label>
                
              <Col sm={6} md={4}>
                        
                        <Form.Control
                            type="text"
                            name="title"
                            value={newItem.title}
                            onChange={(e) => handleInputChange(e)}
                            placeholder="Enter item title"
                        />
                    </Col>
                </Form.Group>
             
                <Form.Group as={Row} controlId="formGroup">
                    <Form.Label column sm={2} className='ms-4 mb-1'>Groups</Form.Label>
                    <Col sm={6} md={4}>
                        <Form.Control
                            as="select"
                            name="group"
                            value={newItem.group}
                            onChange={(e) => handleInputChange(e)}
                        >
                            {groups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
             
                <Form.Group as={Row} controlId="formNewGroupTitle">
                    <Form.Label column sm={2} className='ms-4 mb-1'>New Group Title</Form.Label>
                    <Col sm={6} md={4}>
                        <Form.Control
                            type="text"
                            name="title"
                            value={newGroup.title}
                            onChange={(e) => handleGroupInputChange(e)}
                            placeholder="Enter a new group title"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formStartTime">
                    <Form.Label column sm={2} className='ms-4 mb-1'>Start Time</Form.Label>
                    <Col sm={6} md={4}>
                        <Form.Control
                            type="datetime-local"
                            name="start_time"
                            value={newItem.start_time.format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEndTime">
                    <Form.Label column sm={2} className='ms-4 mb-1'>End Time</Form.Label>
                    <Col sm={6} md={4}>
                        <Form.Control
                            type="datetime-local"
                            name="end_time"
                            value={newItem.end_time.format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button className='ms-4 mb-1' variant="primary" type="button" onClick={(e) => handleAddItem(e)}>
                            Add Item
                        </Button>
                        {' '}
                        <Button className='ms-1 mb-1'variant="secondary" type="button" onClick={(e) => handleAddGroup(e)}>
                            Add Group
                        </Button>
                    </Col>
                </Form.Group>
             
          </Form>
        </div>
    )
}

export default NewItemForm