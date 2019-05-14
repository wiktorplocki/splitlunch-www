import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import useModal from '../../hooks/useModal';

import Modal from '../../components/Modal/Modal';
import SnackBar from '../../components/SnackBar/SnackBar';

const Main = () => {
  const { isShowing, toggle } = useModal();
  useEffect(() => toggle(), []);
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <h1>Hello World!</h1>
      </div>
      {!Cookies.get('SPLITLUNCH_PROMPT') && (
        <Modal
          isShowing={isShowing}
          modalContent={
            <SnackBar type="cookies" toggle={toggle} duration={0}>
              This site uses cookies to enhance the user experience.{' '}
              <a href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm">
                Click here
              </a>{' '}
              to learn more.
            </SnackBar>
          }
        />
      )}
    </React.Fragment>
  );
};

export default Main;
