import styled from 'styled-components';

export const NotificationContainer = styled.div`
  position: fixed;
  background: white;
  padding: 8px 12px;
  width: 60vw;
  height: auto;
  text-align: center;
  border-radius: 5px;
  z-index: 1;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 4px 3px 20px 3px #5e5e5e;
  visibility: hidden;
`;
