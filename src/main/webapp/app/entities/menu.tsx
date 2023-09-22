import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.project" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/label">
        <Translate contentKey="global.menu.entities.label" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ticket">
        <Translate contentKey="global.menu.entities.ticket" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/author">
        <Translate contentKey="global.menu.entities.author" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book">
        <Translate contentKey="global.menu.entities.book" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
