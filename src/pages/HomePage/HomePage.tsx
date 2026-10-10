
import ComingSoon from "./__components/ComingSoon"
import HeroSection from "./__components/HeroSection"
import NowPlayingSection from "./__components/NowPlaying"
import RecentlyViewed from "./__components/RecentlyViewed"

const HomePage = () => {
    return (<>
        <HeroSection />
        <RecentlyViewed/>
        <NowPlayingSection />
        <ComingSoon />

    </>)
}
export default HomePage