import axios from "axios";

export const get = async (url) => {
  try {
    let res = null;
    res = await axios.get(url);
    return {
      status: 200,
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error) {
    return error.response;
  }
};

export const getByID = async (url, id) => {
  try {
    let res = null;
    res = await axios.get(`${url}/${id}`);
    return {
      status: 200,
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error) {
    return error.response;
  }
};

export const create = async (url, data) => {
  try {
    let res = null;
    res = await axios.post(url, data);
    return {
      status: 200,
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return error.response;
  }
};

export const update = async (url, id, data) => {
  try {
    let res = null;
    res = await axios.put(`${url}/${id}`, data);
    return {
      status: 200,
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return error.response;
  }
};
