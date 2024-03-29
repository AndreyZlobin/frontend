import { toast } from 'react-toastify';

export enum NotificationVariantTypes {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export const NOTIFY_POSITIONS = toast.POSITION;

export const NOTIFY_CLASSNAME = 'self-notify';
