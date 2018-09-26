import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default (props) => {
  return (
    <div>
      <PrivateHeader title="Seus Links"/>
      <LinksList />
      <AddLink />
    </div>
  );
}
