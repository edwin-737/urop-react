import axios from 'axios';
import UserData from './UserData.js'
const host = 'https://urop-react-backend.azurewebsites.net/';
const forumPostUrl = host + 'forumPost';
export default async function ForumPostData() {
    const forumPostData = await axios({
        method: 'get',
        url: forumPostUrl,
    })
        .then(response => {
            var topics = response.data.filter((curForumPost) => {
                return !curForumPost.isReply
            });
            console.log('all forumPosts retrieved', topics);
            return UserData(topics);
        })
        .catch(err => console.log(err));

    return forumPostData;
}