import ComingSoon from "./ComingSoon"
import HeroSection from "./HeroSection"
import LoginModal from "./LoginModal"
import NowPlayingSection from "./NowPlaying"
import SignUpModal from "./SignUpModal"

const HomePage = () => {
    return (<>
        <HeroSection />
        <NowPlayingSection />
        <ComingSoon />


        {/* ///// */}
        <LoginModal/>
        <SignUpModal/>

    </>)
}
export default HomePage