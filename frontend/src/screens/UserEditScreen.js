import React, {useState, useEffect} from 'react'
import { Link, useNavigate,  useParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditScreen() {
    const { id: userId } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else{
            if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId))
        } else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        }

    }, [user, userId, successUpdate, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

  return (
    <div>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            
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

export default UserEditScreen
