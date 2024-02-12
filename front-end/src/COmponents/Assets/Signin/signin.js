import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

function Signin(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Login with:', email, password);
      };
    
    return(
        <div className="main-container">
            <Form className="log-in-form" onSubmit={handleSubmit}>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </FormGroup>
                <Button type="submit">Log In</Button>
            </Form>
        </div>
    );
}
export default Signin;