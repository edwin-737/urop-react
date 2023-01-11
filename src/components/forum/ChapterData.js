import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
const chapterUrl = host + 'chapter';
export default async function ChapterData() {
    const chapterData = await axios({
        method: 'get',
        url: chapterUrl,
    })
        .then(items => {
            console.log('in getChapterData items.data', items.data);
            return items.data;
        })
        .catch(err => console.log(err));

    return chapterData;
}