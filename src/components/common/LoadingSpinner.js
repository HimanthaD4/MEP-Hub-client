const LoadingSpinner = ({ fullPage = false, size = 'md' }) => {
    const sizes = {
      sm: 'h-6 w-6 border-2',
      md: 'h-8 w-8 border-2',
      lg: 'h-12 w-12 border-4'
    };
  
    return (
      <div className={`flex justify-center items-center ${fullPage ? 'h-screen' : ''}`}>
        <div className={`animate-spin rounded-full border-t-transparent ${sizes[size]} border-blue-500`}></div>
      </div>
    );
  };
  
  export default LoadingSpinner;