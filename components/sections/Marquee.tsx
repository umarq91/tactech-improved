import React from "react";

function AboutMe() {
  return (
    <div
      data-scroll
      className=' bg-[#CDEA68] pb-20 mb-32 font-["Neue_Montreal"] rounded-t-3xl text-black'
    >
      <div className="px-14 md:px-20 pt-20">
        <h1 className="  leading-[3.5vw]  text-[4.3vw] tracking-tight">
          Let's discuss your project,e, and create something extraordinary
          together. Feel free to reach out, and let's embark on a journey of
          innovation and creativity.
        </h1>
      </div>
      <div className="w-full flex gap-5  p-14 border-t-[1px] pt-10 mt-20 border-[#a1b562]">
        <div className="w-1/2">
          <h1 className="text-5xl font-[600]">Our Approach :</h1>
          <button className="px-7 py-4 mt-10 flex gap-10 items-center bg-zinc-900 rounded-full text-white ">
            Read More
            <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
          </button>
        </div>
        <div className="w-1/2 rounded-2xl h-[70vh] bg-[#a4bb53]">
        <img src="https://www.figma.com/community/resource/23ff9693-88b1-498c-8fb2-8da862954888/thumbnail" className="w-full h-full object-cover"/>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default AboutMe;
