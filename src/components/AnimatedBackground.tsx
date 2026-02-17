const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px] animate-glow-pulse" />
      <div 
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-neon-violet/5 rounded-full blur-[150px] animate-glow-pulse" 
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-0 left-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[150px] animate-glow-pulse" 
        style={{ animationDelay: "4s" }}
      />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-slow ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
