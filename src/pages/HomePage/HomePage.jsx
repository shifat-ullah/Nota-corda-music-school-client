import CarouselBanner from "../../components/SharedComponents/BannerSlider/CarouselSlider";
import PopularClasses from "../../components/SharedComponents/classes/PopularClasses";

const HomePage = () => {
    return (
        <div>
            <div className="mt-[300px]">
                <hr className=" bg-white" />
                <CarouselBanner></CarouselBanner>
            </div>
            <div className='md:mt-[300px] mt-[100px]'>
                <PopularClasses></PopularClasses>
            </div>
        </div>
    );
};

export default HomePage;