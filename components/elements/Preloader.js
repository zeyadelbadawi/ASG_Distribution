export default function Preloader() {
    return (
      <div className="preloader fixed inset-0 z-[99999] flex items-center justify-center bg-white">
        <div className="relative flex flex-col items-center">
          <div className="relative h-24 w-24">
            {/* External Spinning Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-t-[#ff6600] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            {/* Internal Pulsing Logo Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src="/assets/images/resources/logo-1.png"
                alt="ASG Distribution"
                className="h-full w-full object-contain animate-pulse"
              />
            </div>
          </div>
          {/* Loading Text */}
        </div>
      </div>
    )
  }
  