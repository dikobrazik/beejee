import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuthentication, logout } from '../../../../auth/store/index/actions';
import { isAuthorizedSelector } from '../../../../auth/store/index/selectors';
import AuthFormsLogin from '../../../../auth/ui/forms/login';

const NavigationComponentHeader = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(isAuthorizedSelector);
  const [isAuthModalShown, setIsAuthModalShown] = useState(false);
  useEffect(() => {
    dispatch(initializeAuthentication());
  }, []);
  const onLogoutClick = useCallback(() => {
    dispatch(logout());
  }, []);
  return (
    <>
      <Row className="py-4">
        <Col></Col>
        <Col sm="auto">
          {authorized && (
            <Button variant="danger" onClick={onLogoutClick}>
              Logout
            </Button>
          )}
          {!authorized && (
            <Button variant="info" onClick={setIsAuthModalShown.bind(null, true)}>
              Login
            </Button>
          )}
        </Col>
      </Row>
      <Modal show={isAuthModalShown} onHide={setIsAuthModalShown.bind(null, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthFormsLogin onDone={setIsAuthModalShown.bind(null, false)}></AuthFormsLogin>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationComponentHeader;
