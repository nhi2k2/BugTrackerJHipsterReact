import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Project from './project';
import Label from './label';
import Ticket from './ticket';
import Author from './author';
import Book from './book';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="project/*" element={<Project />} />
        <Route path="label/*" element={<Label />} />
        <Route path="ticket/*" element={<Ticket />} />
        <Route path="author/*" element={<Author />} />
        <Route path="book/*" element={<Book />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
