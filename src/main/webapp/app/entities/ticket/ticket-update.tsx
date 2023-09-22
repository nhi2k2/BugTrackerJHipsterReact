import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ILabel } from 'app/shared/model/label.model';
import { getEntities as getLabels } from 'app/entities/label/label.reducer';
import { ITicket } from 'app/shared/model/ticket.model';
import { getEntity, updateEntity, createEntity, reset } from './ticket.reducer';

export const TicketUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const projects = useAppSelector(state => state.project.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const labels = useAppSelector(state => state.label.entities);
  const ticketEntity = useAppSelector(state => state.ticket.entity);
  const loading = useAppSelector(state => state.ticket.loading);
  const updating = useAppSelector(state => state.ticket.updating);
  const updateSuccess = useAppSelector(state => state.ticket.updateSuccess);

  const handleClose = () => {
    navigate('/ticket' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProjects({}));
    dispatch(getUsers({}));
    dispatch(getLabels({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ticketEntity,
      ...values,
      labels: mapIdList(values.labels),
      project: projects.find(it => it.id.toString() === values.project.toString()),
      assignedTo: users.find(it => it.id.toString() === values.assignedTo.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...ticketEntity,
          project: ticketEntity?.project?.id,
          assignedTo: ticketEntity?.assignedTo?.id,
          labels: ticketEntity?.labels?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myApp.ticket.home.createOrEditLabel" data-cy="TicketCreateUpdateHeading">
            <Translate contentKey="myApp.ticket.home.createOrEditLabel">Create or edit a Ticket</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ticket-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('myApp.ticket.title')}
                id="ticket-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.ticket.description')}
                id="ticket-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField label={translate('myApp.ticket.dueDate')} id="ticket-dueDate" name="dueDate" data-cy="dueDate" type="date" />
              <ValidatedField label={translate('myApp.ticket.done')} id="ticket-done" name="done" data-cy="done" check type="checkbox" />
              <ValidatedField id="ticket-project" name="project" data-cy="project" label={translate('myApp.ticket.project')} type="select">
                <option value="" key="0" />
                {projects
                  ? projects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ticket-assignedTo"
                name="assignedTo"
                data-cy="assignedTo"
                label={translate('myApp.ticket.assignedTo')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('myApp.ticket.label')}
                id="ticket-label"
                data-cy="label"
                type="select"
                multiple
                name="labels"
              >
                <option value="" key="0" />
                {labels
                  ? labels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.label}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ticket" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TicketUpdate;
