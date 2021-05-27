import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CreatePlaylist from './../CreatePlaylist'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';



it('renders without crashing', () =>{
    const div = document.createElement('div');
    const {getByTestId} = render(<CreatePlaylist/>);
    ReactDOM.render(<CreatePlaylist/>, div);
    ReactDOM.unmountComponentAtNode(div);
}
  );

it("captures clicks", () => {
  const { getByText } = render(<CreatePlaylist/>);
                               
  const node = getByText("Create");
  fireEvent.click(node);

});