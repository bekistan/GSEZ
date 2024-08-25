
import Image from 'next/image';

const About = () => {
  return (
    <div className="container mx-auto mb-8 pt-14 p-4">
      <header className="pt-14 text-center mb-8">
        <h1 style={{ fontFamily: 'var(--font-merriweather)'}} className="mt-1 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4">ABOUT US</h1>
        <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-base md:text-lg lg:text-xl text-gray-400">
          Welcome to GSEZ - Gada Special Economic Zone
        </p>
      </header>

      <section className="grid col-md lg:grid-cols-2 gap-8 bg-gray-900 mb-8 rounded-lg shadow-lg">
        <Image src="/image/ppl.jpg" alt="Our Team" width={600} height={500} className="w-full h-auto rounded-lg p-6" />
        <div className="flex flex-col col-md pl-2 pr-2 justify-center">
          <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">OUR TEAM</h2>
          <p style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-base md:text-lg lg:text-xl text-gray-400">
          We aspire to be the model economic hub of Africa by 2062
          </p>
        </div>
      </section>

      <section className="grid col-md lg:grid-cols-2 gap-8 bg-gray-900 pl-5 mb-8 rounded-lg shadow-lg">
        <div className="flex flex-col col-md pl-2 pr-2 justify-center">
          <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">OUR MISSION</h2>
          <p style={{ fontFamily: 'var(--font-poppins)'}}  className="text-base md:text-lg lg:text-xl text-gray-400">
          Providing serviced land to attract investment for industry and commercial hub to generate 
          jobs and foreign currency and transform the industrial development and ultimately 
          economic transformation of the country in general and of Oromia in particular..
          </p>
        </div>
        <Image src="/image/mission.jpg" alt="Our Mission" width={600} height={500} className="w-full h-auto p-6 rounded-lg" />
      </section>

      <section className="grid col-md lg:grid-cols-2 bg-gray-900 gap-8 mb-8 rounded-lg shadow-lg">
        <Image src="/image/team.jpg" alt="Our vision" width={600} height={400} className="w-full h-auto p-6 rounded-lg" />
        <div className="flex flex-col col-md pl-2 pr-2 justify-center">
          <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="pt-5 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">OUR VISION</h2>
          <p style={{ fontFamily: 'var(--font-poppins)'}}  className="pr-2 text-base md:text-lg lg:text-xl text-gray-400">
           To be the pioneer zone of reform and innovation and center of the economic development of
           Ethiopia as well as to be the model of economic hub of Africa by developing cost-effective
           integrated infrastructure and creating an attractive investment environment by 2062.
          </p>
        </div>
      </section>
      
           <section className="grid col-md lg:grid-cols-2 bg-gray-900 gap-8 mb-8 rounded-lg shadow-lg">
        <Image src="/image/team.jpg" alt="Our vision" width={600} height={500} className="w-full h-auto p-6 rounded-lg" />
        <div className="flex flex-col col-md p;-2 pr-2 justify-center">
          <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="pt-5 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">GOALS AND PURPOSE</h2>
          <p  style={{ fontFamily: 'var(--font-poppins)'}} className="pb-2 text-base md:text-lg lg:text-xl text-gray-400">
          The purposes of creating Special Economic Zones are to achieve the economic and social 
          transformation of the region through promoting a conducive policy and providing
           critical public goods, attracting foreign and domestic investment,
           enhancing technology transfer needed to expand manufacturing activities, creates jobs, 
           generate multiplier impact on the economy and promote 
           regional development.  </p>

        </div>
      </section>

      <section className="text-center mb-8">
        <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">GSEZ MAP</h2>
        <Image src="/image/map.png" alt="Our Location" width={1200} height={800} className="w-full h-auto" />
      </section>
    </div>
  );
};

export default About;
