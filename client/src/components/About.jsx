import React from "react";

const About = () => {
  return (
    <section className="bg-white py-6">
      <div className='text-center pb-5'><h1 className="text-3xl font-bold text-gray-800 mb-4">About</h1></div>
      <div className="container mx-auto px-4">
        {/* Our Story Section */}
        <div className="flex flex-col lg:flex-row pb-36">
          <div className="w-full lg:w-2/3 lg:pr-20">
            <div className="pt-2">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Story
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
              </p>
              <p className="text-base text-gray-600 mb-6">
                Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
              </p>
              <p className="text-base text-gray-600">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
            <div className="border-4 border-gray-200 p-1">
              <div className="overflow-hidden">
                <img
                  src="/images/about-01.jpg"
                  alt="Our Story"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-2/3 lg:pl-20">
            <div className="pt-2">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.
              </p>
              <div className="border-l-4 border-gray-300 pl-6 mt-6">
                <p className="italic text-base text-gray-600 mb-3">
                  Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
                </p>
                <span className="text-sm text-gray-500 font-medium">- Steve Job’s</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
            <div className="border-4 border-gray-200 p-1">
              <div className="overflow-hidden">
                <img
                  src="/images/about-02.jpg"
                  alt="Our Mission"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
