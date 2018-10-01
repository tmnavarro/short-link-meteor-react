import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default (props) => {
  return (
    <div>
      <PrivateHeader title="Seus Links"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
}
