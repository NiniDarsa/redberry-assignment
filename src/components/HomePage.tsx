import ComingSoon from "./ComingSoon"
import HeroSection from "./HeroSection"
import NowPlayingSection from "./NowPlaying"
import RecentlyViewed from "./RecentlyViewed"

const HomePage = () => {
    return (<>
        <HeroSection />
        <RecentlyViewed/>
        <NowPlayingSection />
        <ComingSoon />

    </>)
}
export default HomePage