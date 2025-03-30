import axios from "axios";
import { hostname } from "./server";

const getCollegeIssues = async ()=>{
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.get(`${hostname}/api/issue/college/checkIssues`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    console.log(res.data);
    return res.data.issues;
}

const getTechnicians2 = async () =>{
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.get(`${hostname}/api/issue/listTechnicians`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    console.log(res.data);
    return res.data;
}

const assignTechnician2 = async (data: any)=>{
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.put(`${hostname}/api/issue/college/assign`, data, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    return res.data;
}

const reviewIssues2 = async (issue_id : number)=>{
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.delete(`${hostname}/api/issue/college/review/${issue_id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    return res.data.issue;
}

export { getCollegeIssues, getTechnicians2, assignTechnician2, reviewIssues2 };