import axios from "axios";

const SUB_API_URL = 'https://localhost:5001/NewsPaper/';

const editSubscription = (newsId, name, fee) => {

    return axios.put(`${SUB_API_URL + newsId}`, {
        name,
        fee
    });
};

const createSubscription = (values) => {
    const formValues = JSON.parse(JSON.stringify(values));
    return axios.post(`${SUB_API_URL}`, formValues);
};

const getSubscriptions = () => axios.get(SUB_API_URL).then((response) => response.data);

const getSubscription = (newsId) => axios.get(SUB_API_URL + newsId);

const deleteSubscription = (id) => axios.delete(SUB_API_URL + id);

export default {
    getSubscriptions,
    getSubscription,
    editSubscription,
    deleteSubscription,
    createSubscription
};