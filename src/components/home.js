import '../styles/home.css';
import '../fonts/tahomabd.ttf';
import Logo from '../images/logo.jpg';
function Home() {
    return (
        <div className = "page" id = "home">
            
            <div id = "logo"><img src = {Logo} alt = "genshin" id = "logoImg"/>gpo</div>
            <div id = "notice" class = "blob">
                <h2 class = "top" id = "announcementTop">
                    What is gpo?
                </h2>
                <div class = "bottom" id = "announcementBottom">
                    Good players only is a simple Discord chat where the "good players" post racist and misogynist comments and
                    share their most depressing thoughts. There are channels dedicated to a variety of topics,
                     from larping and masturbating to rolls, music and pornography. Users are ranked based on
                      dick size  before being allowed to participate in the community.
                      Feel free to click on a channel and start chatting!
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
                        <li><a href = "#/board/pol">Politically Incorrect</a></li>
                    </ul>
                    {/*
                    <ul id = "jap">
                        <li class = "header">Japanese Culture</li>
                        <li>Anime & Manga</li>
                        <li>Japan hate</li>
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
                        <li>Racism</li>
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

                    <ul>
                        <li class = "header">Adult</li>
                        <li>Adult GIF</li>
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