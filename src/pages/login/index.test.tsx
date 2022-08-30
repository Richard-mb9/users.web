import React from 'react';

import { cleanup, fireEvent, waitFor, render } from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node';
import Login from './index';

const server = setupServer()

beforeAll(() => server.listen());

afterEach(()=>{
    cleanup();
    server.resetHandlers();
});

afterAll(() => server.close());

it("should render the login screen", ()=>{
    const { queryAllByText, getByRole } = render(<Login />)

    const textLogin = queryAllByText(/Login/i)[0]
    const buttonLogin = getByRole('button')

    expect(textLogin).toBeDefined();
    expect(buttonLogin).toHaveTextContent('Login')
    
})

it("should change inputs values", ()=>{
    const { getByLabelText } = render(<Login />);


    const inputEmail = getByLabelText(/Email/) as HTMLInputElement;
    const inputPassword = getByLabelText(/Senha/) as HTMLInputElement;

    fireEvent.change(inputEmail, {target: {value: "email"}});
    fireEvent.change(inputPassword, {target: {value: "password"}});


    expect(inputEmail.value).toBe("email")
    expect(inputPassword.value).toBe("password")
});


it("should say the credentials are incorrect", async ()=>{
    server.use(
        rest.post('http://localhost:5000/auth',(req, res, ctx) => {
            return res(
                ctx.json({error: 'invalid credentials'}),
                ctx.set('Content-Type', 'application/json'),
                ctx.status(400),
            )
        })
    )

    const {getByRole, getByLabelText, getByText} = render(<Login />);

    const inputEmail = getByLabelText(/Email/) as HTMLInputElement;
    const inputPassword = getByLabelText(/Senha/) as HTMLInputElement;

    fireEvent.change(inputEmail, {target: {value: "email"}});
    fireEvent.change(inputPassword, {target: {value: "password"}});
    
    const buttonLogin = getByRole('button');
    fireEvent.click(buttonLogin)

    await waitFor(()=>{
        expect(getByRole('alert')).toBeDefined()
    });

    const alert = getByText(/verfique suas credenciais/)
    expect(alert).toBeDefined()
}); 


it("should inform that the user is blocked", async ()=>{
    server.use(
        rest.post('http://localhost:5000/auth',(req, res, ctx) => {
            return res(
                ctx.json({error: 'invalid credentials'}),
                ctx.set('Content-Type', 'application/json'),
                ctx.status(403),
            )
        }),
    )

    const {getByRole, getByLabelText, getByText} = render(<Login />);

    const inputEmail = getByLabelText(/Email/) as HTMLInputElement;
    const inputPassword = getByLabelText(/Senha/) as HTMLInputElement;

    fireEvent.change(inputEmail, {target: {value: "email"}});
    fireEvent.change(inputPassword, {target: {value: "password"}});
    
    const buttonLogin = getByRole('button');
    fireEvent.click(buttonLogin)

    await waitFor(()=>{
        expect(getByRole('alert')).toBeDefined()
    });

    const alert = getByText(/Usuario temporariamente bloqueado por excesso de tentativas, tente novamente após 10 minutos/)
    expect(alert).toBeDefined()
}); 