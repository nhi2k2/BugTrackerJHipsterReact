import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ticket.reducer';

export const TicketDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ticketEntity = useAppSelector(state => state.ticket.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ticketDetailsHeading">
          <Translate contentKey="myApp.ticket.detail.title">Ticket</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ticketEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="myApp.ticket.title">Title</Translate>
            </span>
          </dt>
          <dd>{ticketEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="myApp.ticket.description">Description</Translate>
            </span>
          </dt>
          <dd>{ticketEntity.description}</dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="myApp.ticket.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>{ticketEntity.dueDate ? <TextFormat value={ticketEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="done">
              <Translate contentKey="myApp.ticket.done">Done</Translate>
            </span>
          </dt>
          <dd>{ticketEntity.done ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="myApp.ticket.project">Project</Translate>
          </dt>
          <dd>{ticketEntity.project ? ticketEntity.project.name : ''}</dd>
          <dt>
            <Translate contentKey="myApp.ticket.assignedTo">Assigned To</Translate>
          </dt>
          <dd>{ticketEntity.assignedTo ? ticketEntity.assignedTo.login : ''}</dd>
          <dt>
            <Translate contentKey="myApp.ticket.label">Label</Translate>
          </dt>
          <dd>
            {ticketEntity.labels
              ? ticketEntity.labels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.label}</a>
                    {ticketEntity.labels && i === ticketEntity.labels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/ticket" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ticket/${ticketEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TicketDetail;
