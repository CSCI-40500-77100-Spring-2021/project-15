import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import  { useAuth } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Login(){
    const emailRef = useRef()
    const passRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            history.push("/")
        } catch{
            setError('Sign in Failed.')
        }
        setLoading(false)
    }

    return(
        <>
        <Container ClassName='d-flex align-items-center justify-content-center'>
            <div className="w-100" style={{maxWidth:"400px", margin: "0 auto"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {currentUser.email}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                        
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                No Account? <Link to="/signup">Sign Up</Link>
            </div>
            </div>
        </Container> 
        </>
    )
}