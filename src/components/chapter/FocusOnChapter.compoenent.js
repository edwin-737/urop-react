import { useEffect, useState } from 'react';
import axios from 'axios';
// import Iframe from 'react-iframe';
// const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
// const chapterUrl = host + 'chapter';
const googleSearchUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDNNc6A9zEBtUZcme_ZKhqzsCxOJpH5G0k&cx=2635b7d74d7154995&q=';
// const userUrl = host + 'user';
export default function FocusOnChapter(props) {
    const [retrieves, setRetrieves] = useState(0);
    // const [relatedPosts, setRelatedPosts] = useState([]);
    const [relatedResources, setRelatedResources] = useState([]);
    const [resourceCards, setResourceCards] = useState([]);
    useEffect(() => {
        if (relatedResources.length === 0)
            return;
        relatedResources.forEach((curResource) => {
            console.log('in useEffect', curResource);
            setResourceCards(prev => [
                ...prev,
                <li className='resourceCard-list-item'>
                    <div className='resourceCard-div'>
                        <a href={curResource.link}><span className='resourceCard-title-font'>{curResource.title}</span></a>
                        <br />
                        <span className='resourceCard-link-font'>{curResource.link}</span>
                        <br />
                        <span className='resourceCard-body-font'>{curResource.snippet}</span>
                        <br />
                    </div>
                </li>
            ]);
        })
    }, [relatedResources])
    const getResourceData = async () => {
        if (retrieves === 1)
            return 0;
        setRetrieves(1);
        const curData = await axios.get(
            googleSearchUrl + props.rootChapter.name
        )
            .then(res => {
                console.log('in axios.get', res.data);
                console.log('items in search result', res.data.items)
                return res.data;
            })
            .catch(err => console.log(err));
        if (curData.items != null) {
            console.log(curData.items);
            setRelatedResources(curData.items);
        }

    };
    getResourceData();
    return (
        <div>

            {/* <Iframe url="https://neo4j.com/developer/graph-data-science/graph-algorithms/"
                width="640px"
                height="320px"
                id=""
                display="block"
                position="relative" /> */}
            <ul className='resourceCard-list'>
                {resourceCards}
            </ul>
        </div>
    )
}