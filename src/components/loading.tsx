import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <style jsx>{`
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      
      .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #333;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      
      `}</style>
    </div>
  );
};


export default Loading;
