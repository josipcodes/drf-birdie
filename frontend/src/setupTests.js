// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {setupServer} from "msw/node";
import { handlers } from './mocks/handlers';

// creating server by calling setupServer funct.
const server = setupServer(...handlers)


// test setup
// calling server.listen before tests
beforeAll(() => server.listen())
// call reset Handlers after each test
afterEach(() => server.resetHandlers())
// test tear down
afterAll(() => server.close())