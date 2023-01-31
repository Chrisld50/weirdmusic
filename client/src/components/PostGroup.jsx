import { Col, Form, Button } from "react-bootstrap";
import { useMutation } from '@apollo/client';
import { POST_GROUP } from '../utils/mutations';
import React, { useState } from 'react';
import Auth from '../utils/auth';
import pic from './images/logo.png';


const PostGroup = () => {
    const [userFormData, setUserFormData] = useState({name: ''})
    const [postGroup, {error} ] = useMutation(POST_GROUP)
    const [validated] = useState(false)


    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserFormData({ ...userFormData, [name]:value })
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
            const { data } = await postGroup({
                variables: { ...userFormData }
            });
            console.log(data)
        }catch (e) {
            console.log(e)
        }
    

    setUserFormData({
        name: ''
    })
}

return (

    <nav className="w-full bg-red shadow">
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
           <h3 className='logo'>
           <img width='70px' height='50px' src={pic} alt='colored logo' />
            <h3 className="text-black font-serif uppercase text-center text-lg font-bold">
                <h3>Weird Music</h3>
            </h3>
           </h3>

            <div className='group-form'>
            <h2> Enter a new Group! </h2>

                        <Form noValidate validated={validated}onSubmit={handleFormSubmit}>
                            <Form.Group>
                                <Form.Label column lg={2}>
                                    Name of your Group
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                    type='text'
                                    placeholder='Enter your group...'
                                    onChange={handleInputChange}
                                    name='name'
                                    value={userFormData.name}
                                    required
                                    />
                                </Col>
                            </Form.Group>
                                <Button
                                disabled={!(userFormData.name)}
                                variant="sucess"
                                type="submit"
                                > Submit </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
};

export default PostGroup; 