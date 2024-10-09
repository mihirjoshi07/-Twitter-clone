import Avatar from 'react-avatar';

import { Image } from 'primereact/image';



const explore = [
  {
    desc: "INDIA hasn't lost a Test match at Kanpur in the last 41 years. 🤯🇮🇳",
    img: "http://localhost:4000/uploads/cricket.jpg"
  },
  {
    desc: "BREAKING: Derrick Rose has announced that after 15 NBA seasons, he is retiring from basketball. 🌹",
    img: "http://localhost:4000/uploads/retired.jpg"
  },
  {
    desc: "SpaceX engineers have spent years preparing and months testing for the booster catch attempt on Flight 5, with technicians pouring tens of thousands of hours into building the infrastructure to maximize our chances for success",
    img: "http://localhost:4000/uploads/spacex.jpg"
  },
  {
    desc: `Impressive visit to the @blueorigin  Huntsville Engine Production Facility!  @NASA
 is proud to partner with Blue Origin, especially on the Blue Moon human landing system, which will help ensure a steady cadence of astronauts on the Moon to live and work before we venture to Mars.`,

    img: "http://localhost:4000/uploads/jeff.jpg"
  },
  {
    desc: `As the 2024 season ends, I look back on everything I’ve learned through the year - about improvement, setbacks, mentality and more. 

On Monday, I injured myself in practice and x-rays showed that I had fractured the fourth metacarpal in my left hand. It was another painful challenge for me. But with the help of my team, I was able to participate in Brussels. 

This was the last competition of the year, and I wanted to end my season on the track. While I couldn’t meet my own expectations, I feel this was a season in which I learned a lot. I am now determined to return, fully fit and ready to go. 

I want to thank all of you for your encouragement. 2024 has made me a better athlete and person. See you in 2025. 💪

Jai Hind! 🇮🇳`,
    img: "http://localhost:4000/uploads/neeraj.jpg"
  },
  {
    desc: `Glad to have met Quad Leaders during today’s Summit in Wilmington, Delaware. The discussions were fruitful, focusing on how Quad can keep working to further global good. We will keep working together in key sectors like healthcare, technology, climate change and capacity building," posts PM Modi (
@narendramodi
).
`,
    img: "http://localhost:4000/uploads/quad.jpg"
  },
 

]

export default function Explore() {

  return (
    <div className='w-[100%]'>
      <div className='flex items-center justify-between border-b border-gray-200'>

        <div

          className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 
                    "border-b-4 border-blue-500" : ""}`}
        >
          <h1 className='font-semibold text-gray-600 text-lg'>#Explore </h1>
        </div>
      </div>

      {
        explore.map((item) => (
          <div className='border-b border-gray-200'>
            <div>
              <div className='flex p-4 '>
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                <div className='ml-2 w-full'>


                  <div className='mb-10'>
                    <p className='mt-1 mb-2'>{item.desc}</p>
                    <Image src={item.img} alt="Image" height='300' width="400" />
                  </div>


                </div>

              </div>
            </div>
          </div>
        ))
      }




    </div>
  );
}
