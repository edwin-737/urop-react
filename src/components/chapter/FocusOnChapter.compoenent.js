import { useState } from 'react';
import axios from 'axios';
// const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
// const chapterUrl = host + 'chapter';
const googleSearchUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDNNc6A9zEBtUZcme_ZKhqzsCxOJpH5G0k&cx=2635b7d74d7154995&q=';
// const userUrl = host + 'user';
export default function FocusOnChapter(props) {
    const [retrieves, setRetrieves] = useState(0);
    // const [relatedPosts, setRelatedPosts] = useState([]);
    const [relatedResources, setRelatedResources] = useState([]);
    const getResourceData = async () => {
        if (retrieves === 1)
            return 0;
        setRetrieves(1);
        const curData = await axios.get(
            googleSearchUrl + props.rootChapter.name
        )
            .then(res => {
                console.log('in axios.get', res.data);
                return res.data;
            })
            .catch(err => console.log(err));
        setRelatedResources(curData.items);

    };
    getResourceData().then(() => console.log('related Resources', relatedResources));
}