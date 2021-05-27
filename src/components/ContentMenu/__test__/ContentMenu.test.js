import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ContentMenu from './../ContentMenu'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';





it("captures clicks", () => {
  const { getByText } = render(<ContentMenu/>);
                               
  fireEvent.click(getByText("Global songs"));

});

it("captures clicks", () => {
  const { getByText } = render(<ContentMenu/>);
  
  fireEvent.click(getByText("Global playlists"));

});
