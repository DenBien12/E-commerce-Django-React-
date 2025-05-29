import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

function EditUserScreen() {
    const { id: userId } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId))
        } else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        
    }

  return (
    <div>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label className='fw-bold'>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label className='fw-bold'>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-3" controlId='isAdmin'>
                    <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className='fw-bold'
                    ></Form.Check>
                </Form.Group>

                <Button className= "mt-3" type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        )}
        </FormContainer>
    </div>
  )
}

export default EditUserScreen
