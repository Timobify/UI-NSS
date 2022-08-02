import axios from "axios";

const NEWS_API_URL = 'https://localhost:5001/NewsPaper/';

const editNewsPaper = (newsId, name, fee) => {

    return axios.put(`${NEWS_API_URL + newsId}`, {
        name,
        fee
    });
};

const createNewsPaper = (values) => {
    const formValues = JSON.parse(JSON.stringify(values));
    return axios.post(`${NEWS_API_URL}`, formValues);
};

const getNewsPapers = () => axios.get(NEWS_API_URL).then((response) => response.data);

const getNewsPaper = (newsId) => axios.get(NEWS_API_URL + newsId);

const deleteNewsPaper = (newsId) => axios.delete(NEWS_API_URL + newsId);

export default {
    getNewsPapers,
    getNewsPaper,
    editNewsPaper,
    deleteNewsPaper,
    createNewsPaper
};