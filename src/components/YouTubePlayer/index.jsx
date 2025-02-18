import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = "AIzaSyDkKQsvEbVRwDslI5hIHkQLaD-WTN4SOVU";
// AIzaSyD3HlZ7jSaEQK_Wd-wS4WeFtK0nXVr1bUI - first apiKey
// AIzaSyCYJatlgFPkdB3V-60sjIx3Ct87NmbydKc - second apiKey
// AIzaSyByCyGs0Cqugjaya_eP8tSTc9GFr4jTKwY - third apikey
// AIzaSyDkKQsvEbVRwDslI5hIHkQLaD-WTN4SOVU - current
// AIzaSyCjsu6TmNHj_njVj9mj6_0NoBut4Ks6B4k - free apikey to use

const YoutubePlayer = ({ emotion }) => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                let query = ''; 

                // Set the query based on the emotion
                switch (emotion) {
                    case 'good':
                        query = 'chill instrumentals uplifting';
                        break;
                    case 'neutral':
                        query = 'neutral instrumentals';
                        break;
                    case 'low':
                        query = 'sad lofi instrumental';
                        break;
                    case 'frustrated':
                        query = 'meditation instrumental';
                        break;
                    default:
                        console.error('Invalid emotion:', emotion);
                        return;
                }

                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: query,
                        type: 'playlist',
                        key: apiKey
                    }
                });

                if (response.data.items.length > 0) {
                    const playlistId = response.data.items[0].id.playlistId;
                    setPlaylist(`https://www.youtube.com/embed/videoseries?list=${playlistId}`);
                } else {
                    console.error('No playlist found for the emotion:', emotion);
                }
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoUrl();
    }, [emotion]);

    return (
        <div style={{ paddingTop: '20px' }}>
            {playlist && (
                <iframe 
                    width="90%"
                    height="315"
                    src={playlist}
                    frameBorder="0"
                    title="Playlist Player"
                ></iframe>
            )}
        </div>
    );
};

export default YoutubePlayer;
