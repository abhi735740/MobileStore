// LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import SignUp from './SignUp';

// test('renders login form', () => {
//     render(<Login />);
//     const usernameInput = screen.getByPlaceholderText('Username');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const loginButton = screen.getByText('Login');

//     expect(usernameInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(loginButton).toBeInTheDocument();
// });

// test('calls onLogin with the correct data when the form is submitted', () => {
//     const mockOnLogin = jest.fn();
//     render(<Login onLogin={mockOnLogin} />);

//     const usernameInput = screen.getByPlaceholderText('Username');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const loginButton = screen.getAllByRole('Login');

//     const username = 'abhishek';
//     const password = '12345';

//     fireEvent.change(usernameInput, { target: { value: username } });
//     fireEvent.change(passwordInput, { target: { value: password } });

//     fireEvent.click(loginButton);

//     expect(mockOnLogin).toHaveBeenCalledWith({ username, password });
// });

describe('SignUp', () => {
    test('renders sign-up form', () => {
        render(<SignUp />);
        const nameInput = screen.getByPlaceholderText('Enter Your Name');
        const emailInput = screen.getByPlaceholderText('Enter Your Email ID');
        const passwordInput = screen.getByPlaceholderText('Enter Your Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        fireEvent.change(nameInput, { target: { value: 'testing' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

    });
});

