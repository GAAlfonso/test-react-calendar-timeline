'use client';
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const DeleteGroupComponet = ({groups, handleDeleteGroup}) => {
    return (
       <div> 
        <Form>
         <Form.Group as={Row} controlId="formDeleteGroup">
           <Form.Label column sm={2} className='ms-4'>Delete Group</Form.Label>
           <Col sm={6} md={4}>
           <Form.Control
                as="select"
                onChange={(e) => handleDeleteGroup(parseInt(e.target.value))}
                        >
                        <option value="">Select a group to delete</option>
                            {groups.map(group => (
                        <option key={group.id} value={group.id}>
                                    {group.title}
                        </option>
                            ))}
            </Form.Control>
            </Col>
         </Form.Group>
        </Form>
       </div> 
    );
};

export default DeleteGroupComponet