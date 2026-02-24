import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
  fullscreen?: boolean;
}

export const ErrorMessage = ({
  message = 'ERROR',
  fullscreen = false
}: ErrorMessageProps) => {
  return (
    <div className={fullscreen ? 'error-message-fullscreen' : 'error-message-container'}>
      <p className="error-message-text">{message}</p>
    </div>
  );
};
