import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const submitHnandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
        navigate(`/?keyword=${keyword}`)
    } else {
        navigate(location.pathname)
        }
    }
  return (
    <Form onSubmit={submitHnandler} className='d-flex align-items-center search-box'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='me-2'
            placeholder='Search Products...'
            >
        </Form.Control>

        <Button
        type='submit'
        variant='outline-secondary'
        className='d-flex align-items-center px-3 py-2 ms-2 rounded-pill shadow-sm'
        style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}
        >
        <FaSearch className='me-2' />
        Search
        </Button>
    </Form>
  )
}

export default SearchBox
