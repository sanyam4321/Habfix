import axios from "axios";
import { hostname } from "./server";

const getAssignedIssues = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.get(`${hostname}/api/issue/technicianIssues`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    console.log(res.data);
    return res.data.issues;
}

const resolveIssue = async (issue_id: number) => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await axios.put(`${hostname}/api/issue/resolve/${issue_id}`, issue_id, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
    console.log(res.data);
}

export { getAssignedIssues, resolveIssue };