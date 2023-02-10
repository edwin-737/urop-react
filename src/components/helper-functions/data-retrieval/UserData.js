import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
const userUrl = host + 'user';
export default async function UserData(topics) {
    var newTopics = topics;
    var userPromiseArr = [];
    topics.forEach((curTopic) => {
        userPromiseArr.push(axios.post(userUrl + '/findOne', {
            _id: curTopic.postedBy,
        }));
    });
    await Promise.allSettled(userPromiseArr)
        .then((usersPromiseResult) => {
            usersPromiseResult.forEach((curUserPromiseResult, index) => {
                const curUser = curUserPromiseResult.value.data;
                if (curUserPromiseResult.status === 'fulfilled' && curUser !== null && curUser.username !== null)
                    newTopics[index].username = curUser.username;
                else
                    newTopics[index].username = 'Anonymous';
                newTopics[index].hidden = false;
                newTopics[index].editing = false;
            })
        })
        .catch(err => console.log(err));

    return newTopics;
}