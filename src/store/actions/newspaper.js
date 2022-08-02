import {
    DELETE_NEWSPAPER, NEWSPAPER_EDIT_FAIL, NEWSPAPER_EDIT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_MESSAGE,
    SET_NEWSPAPERS,
    START_NEWSPAPER_LOADING, STOP_NEWSPAPER_LOADING
} from "./types";
import NewsPaperService from '../../services/newspaper.service';

export const createNewsPaper = (values) => (dispatch) =>
    NewsPaperService.createNewsPaper(values).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            return response;
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            console.log(message);

            dispatch({
                type: REGISTER_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );

export const editNewsPaper = (newsid, name, fee) => (dispatch) =>
    NewsPaperService.editNewsPaper(newsid, name, fee).then(
        (response) => {
            dispatch({ type: NEWSPAPER_EDIT_SUCCESS });
            return response;
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            console.log(message);

            dispatch({ type: NEWSPAPER_EDIT_FAIL });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
        }
    );

export const getAllNewsPapers = () => (dispatch) => {
    dispatch({
        type: START_NEWSPAPER_LOADING
    });

    return NewsPaperService.getNewsPapers().then(
        (response) => {
            // console.log(`Department action ${response[0].active}`);

            dispatch({
                type: SET_NEWSPAPERS,
                payload: response
            });

            dispatch({
                type: STOP_NEWSPAPER_LOADING
            });

            return response;
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
};

export const deleteNewsPaper = (newspaper) => (dispatch) => {
    dispatch({
        type: START_NEWSPAPER_LOADING
    });
    return NewsPaperService.deleteNewsPaper(newspaper.newsid).then(
        (response) => {
            dispatch({
                type: DELETE_NEWSPAPER,
                payload: newspaper
            });

            dispatch({
                type: STOP_NEWSPAPER_LOADING
            });
            return response;
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
};
