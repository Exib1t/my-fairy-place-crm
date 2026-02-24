import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullscreen?: boolean;
}

export const LoadingSpinner = ({ fullscreen = false }: LoadingSpinnerProps) => {
  return (
    <div className={fullscreen ? 'loading-spinner-fullscreen' : 'loading-spinner-container'}>
      <div className="loading-spinner" />
    </div>
  );
};
