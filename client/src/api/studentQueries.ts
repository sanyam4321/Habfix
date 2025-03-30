import axios from "axios";
import { hostname } from "./server";

const createStudentIssue = async (data: any) => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.post(`${hostname}/api/issue/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
        }
    });
    return res.data;
}

const getStudentIssues = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.get(`${hostname}/api/issue/studentIssues`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    console.log(res);
    return res.data.issues;
}

const submitRebate = async (data: any) => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.post(`${hostname}/api/student/rebate`, data, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return res.data;
}


export { getStudentIssues, createStudentIssue, submitRebate };