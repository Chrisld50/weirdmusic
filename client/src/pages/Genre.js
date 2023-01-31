import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GROUP } from '../utils/queries';
import Auth from '../utils/auth';
import Collapsible from 'react-collapsible';
import DeleteGroup from '../components/DeleteGroup';
import PostGroup  from '../components/PostGroup';
import GroupList from '../components/GroupList';
import pic from '../components/images/logo.png';

const Genre = () => {
    const { loading, data } = useQuery(QUERY_GROUP);
    const groups = data?.groups || [];

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }


    

return (
    <div className= 'Genre'>
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
                   </div>
                </div>
            </div>
        </nav>
    

    
    <Collapsible trigger='Metal'>
    <Container >
 {/*}       {loading ? (
            <div>loading...</div>
        ): (
            <GroupList
                groups={groups}
                title="here are the groups!"/>
        )} */}
        <ul>
            <Link to='/postgroup'>
            <Button className="text-red hover:text-indigo-200"
                                        variant='link'>
                                    Create a Chat Group!
                                </Button>
                    </Link>

                <Link to='deletegroup'>
                <Button className="text-red hover:text-indigo-200"
                                        variant='link'>
                                    Delete a Group!
                                </Button>
                </Link>
        </ul>
        </Container>
    </Collapsible>

    <Collapsible trigger='Rock'>
    <Container>
        <p> ROCK </p>
        </Container>  
    </Collapsible>

    </div>

)

}
 
export default Genre;