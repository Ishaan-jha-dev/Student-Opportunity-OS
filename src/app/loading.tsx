'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFEB3B]">
      <div className="w-64 h-64 border-[4px] border-[#111111] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] rounded-[2rem] bg-white overflow-hidden flex items-center justify-center p-4 mb-8">
        <DotLottieReact
          src="/loading.lottie"
          loop
          autoplay
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-[#111111] text-2xl font-black uppercase tracking-widest bg-white px-6 py-3 border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] animate-pulse">
        INITIALIZING...
      </p>
    </div>
  );
}
