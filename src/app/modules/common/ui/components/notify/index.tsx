import React from 'react';
import * as Components from './styles';

const container = React.createRef<HTMLDivElement>();

type NotifyTypes = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

type Options = {
  message: string;
  delay?: number;
  type?: NotifyTypes;
};

const notify = (options: Options) => {
  const { message, delay, type = 'info' } = options;
  const notificationContainer = container.current;
  if (notificationContainer) {
    notificationContainer.textContent = message;
    notificationContainer.classList.add(`text-${type}`);
    notificationContainer.style.visibility = 'visible';
    setTimeout(() => {
      notificationContainer.style.visibility = 'hidden';
      notificationContainer.classList.remove(`text-${type}`);
    }, delay ?? 3000);
  }
};

export const Notification = () => {
  return <Components.NotificationContainer ref={container}></Components.NotificationContainer>;
};

export default notify;
