import '../styles/home.css';
import '../fonts/tahomabd.ttf';
//import Logo from '../images/logo.jpg';
// <img src = {Logo} alt = "genshin" id = "logoImg"/>
function Home() {
    return (
        <div className = "page" id = "home">
            
            <div id = "logo"><img src = "" alt = "genshin" id = "logoImg"/>Forum</div>
            <div id = "notice" class = "blob">
                <h2 class = "top" id = "announcementTop">
                    What is gpo?
                </h2>
                <div class = "bottom" id = "announcementBottom">
                    Disclaimer: This website is a satire. I made it to test my programming skills by implementing an early 2000s website using React.js and Firebase.  
                    <br/><br/>
                    Be sure to familiarize yourself with the #rules before posting and read the pinned messages if you wish to learn more about the lore.
                </div>
            </div>
            <div id = "boards" class = "blob">
                <h2 class = "top" id = "boardsTop">Boards</h2>
                <div class = "bottom" id = "boardsBottom">
                    <ul id = "vidya">
                        <li class = "header">Video Games</li>
                        <li><a href = "#/board/vg">Video Games</a></li>
                    </ul>
                    <ul>
                        <li class = "header">Misc.</li>
                        <li><a href = "#/board/b">Random</a></li>
                        <li><a href = "#/board/pol">World News</a></li>
                    </ul>
                    {/*
                    <ul id = "jap">
                        <li class = "header">Japanese Culture</li>
                        <li>Anime & Manga</li>
                    </ul>
                    <ul id = "vidya">
                        <li class = "header">Video Games</li>
                        <li>Video Games</li>
                        <li>Valorant</li>
                        <li>Fall guys</li>
                    </ul>
                    <ul>
                        <li class = "header">Interests</li>
                        <li>Gym</li>
                        <li>Biking</li>
                        <li>Jogging</li>
                    </ul>
                    <ul>
                        <li class = "header">Creative</li>
                        <li>Food & Grilling</li>
                        <li>Music</li>
                    </ul>
                    <ul>
                        <li  class = "header">Other</li>
                        <li>Business & Finance</li>
                        <li>Dreams</li>
                    </ul>
                    */}
                </div>
            </div>

            <div class = "blob" id = "popular">
                <h2 class = "top" id = "popularTop">Popular Threads</h2> 
                <div class  = "bottom" id = "popularBottom"></div>
            </div>
        </div>
    );
}

export default Home
