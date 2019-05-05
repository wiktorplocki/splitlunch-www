import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ data: { name, rest } }) => (
  <React.Fragment>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 flex">
        <div className="column">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-grey-darker text-base">{rest}</p>
        </div>
      </div>
    </div>
  </React.Fragment>
);

ListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    rest: PropTypes.string
  }).isRequired
};
export default ListItem;
