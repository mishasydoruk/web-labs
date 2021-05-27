import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import UpperMenu from './../UpperMenu'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';





it("captures clicks", () => {
  const { getByText } = render(<UpperMenu/>);
  fireEvent.click(getByText("Login"));

});

it("captures clicks", () => {
  const { getByText } = render(<UpperMenu/>);
  fireEvent.click(getByText("Register"));

});

it("captures clicks", () => {
  const { getByText } = render(<UpperMenu/>);
  fireEvent.click(getByText("Home"));

});
