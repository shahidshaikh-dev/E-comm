import React from "react";

function Featured() {
  return (
<div className="max-w-[1100px] mx-auto mt-16">
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <span className="text-sm text-red-500 font-semibold">
            Featured
          </span>
        </div>

        <h2 className="text-3xl font-bold">New Arrival</h2>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT BIG CARD */}
    {/* LEFT BIG CARD */}
{/* LEFT BIG CARD */}
<div className="lg:col-span-1 bg-white rounded-md overflow-hidden h-[716px] relative border">

  <img
    src="/images/bottom-img1.svg"
    alt="PlayStation"
    className="absolute inset-0 w-full !h-full object-cover object-center"
  />

</div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-6">

          {/* TOP CARD */}
          <div className="bg-white rounded-md overflow-hidden min-h-[240px] relative border">
            <img
              src="/images/botton-img2.svg"
              alt="Women"
              className=" inset-0 w-full h-full object-cover"
            />
          </div>

          {/* BOTTOM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* SPEAKERS */}
            <div className="bg-white rounded-md overflow-hidden min-h-[220px] relative border">
              <img
                src="/images/botton-img3.svg"
                alt="Speakers"
                className=" inset-0 w-full h-full object-cover"
              />
            </div>

            {/* PERFUME */}
            <div className="bg-white rounded-md overflow-hidden min-h-[220px] relative border">
              <img
                src="/images/bottom-img4.svg"
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
