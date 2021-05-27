import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Playlist from './../Playlist'; 
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';





it("captures clicks", () => {
  const { getByText } = render(<Playlist/>);

});