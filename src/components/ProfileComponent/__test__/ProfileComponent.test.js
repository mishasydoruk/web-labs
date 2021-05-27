import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ProfileComponent from './../ProfileComponent'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';



it('renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<ProfileComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
}
  );

it('show username correctly', () =>{
    const {getByTestId} = render(<ProfileComponent usn="user1"/>);
    expect(getByTestId('usn')).toHaveTextContent("Username: user1");
}
  );

it('show username correctly', () =>{
    const {getByTestId} = render(<ProfileComponent eml="email@gmail.com"/>);
    expect(getByTestId('eml')).toHaveTextContent("Email: email@gmail.com");
}
  );

it('corect input', () =>{
    render(<ProfileComponent/>);
   const inputEl = screen.getByTestId("usrin");
    userEvent.type(inputEl, "test");
    expect(screen.getByTestId("usrin")).toHaveValue("test");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
}
  );

it("captures clicks", () => {
  const { getByText } = render(<ProfileComponent/>);
                               
  const node = getByText("Update");
  fireEvent.click(node);

});

it("captures clicks", () => {
  const { getByText } = render(<ProfileComponent/>);
                               
  const node = getByText("Logout");
  fireEvent.click(node);

});
it("captures clicks", () => {
  const { getByText } = render(<ProfileComponent/>);
                               
  const node = getByText("Delete account");
  fireEvent.click(node);

});
