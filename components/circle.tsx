import React from "react";

const Circle = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/5" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
    </div>
  );
};

export default Circle;
