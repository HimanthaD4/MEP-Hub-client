const LoadingSpinner = ({ fullPage = false, size = 'md', showBranding = true }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4'
  };

  const textSizes = {
    sm: 'text-xs mt-2',
    md: 'text-sm mt-3',
    lg: 'text-lg mt-4'
  };

  return (
    <div className={`flex flex-col justify-center items-center ${fullPage ? 'h-screen' : ''}`}>
      <div className="relative">
        {/* Spinner with gradient border */}
        <div 
          className={`animate-spin rounded-full border-t-transparent ${sizes[size]} border-gradient-to-r from-blue-600 to-indigo-800`}
          style={{
            background: 'conic-gradient(transparent 0%, transparent 80%, #3B82F6 80%, #3B82F6 100%)',
            borderImage: 'linear-gradient(to right, #3B82F6, #6366F1) 1'
          }}
        ></div>
        
        {/* Optional center logo */}
        {showBranding && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">MEP</span>
          </div>
        )}
      </div>
      
      {/* Subtle branding text */}
      {showBranding && (
        <div className={`text-gray-500 ${textSizes[size]} font-medium tracking-wide`}>
          mephub.lk
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;