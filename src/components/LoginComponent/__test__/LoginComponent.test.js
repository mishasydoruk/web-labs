import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import LoginComponent from './../LoginComponent'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';





it("captures clicks", () => {
  const { getByText } = render(<LoginComponent/>);
                               
  fireEvent.click(getByText("Login"));

});