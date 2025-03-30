declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useEffect, useState } from "react";
import IssueForm from "./IssueForm";
import StudentProfile from "./StudentProfile";
import ViewIssues from "./ViewIssues";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { getStudentIssues } from "../../api/studentQueries";
import { RebateForm } from "./RebateForm";
import axios from "axios";
import { hostname } from "@/api/server";

interface ButtonProps {
  name: string;
  handleOnClick: () => void;
}

const Button = ({ name, handleOnClick }: ButtonProps) => {
  return (
    <button
      onClick={handleOnClick}
      className="bg-[#00FFF5] text-slate-700 font-semibold rounded p-2 text-lg  transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none"
    >
      {name}
    </button>
  );
};
const MessPaymentHandler = async (user: any) => {
  const amount = parseFloat(user.mess_due) || 100;
  const data = { amount };
  const authToken = sessionStorage.getItem("authToken");
  const {
    data: { key },
  } = await axios.get(`${hostname}/api/student/payment/getkey`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const {
    data: { order },
  } = await axios.post(`${hostname}/api/student/initialisePayment`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const billAmount = order.amount;
  const options = {
    key,
    amount: billAmount.toString(),
    currency: "INR",
    name: user.name,
    description: "Mess Bill Payment",
    image: user.profile_pic,
    order_id: order.id,
    handler: async function (response: any) {
      const data = {
        orderCreationId: order.id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      };
      const result = await axios.post("http://localhost:5000/api/student/finishPayment", data, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        }
      });
      console.log(result.data);
      alert(result.data.message);
    },
    prefill: {
      name: user.name, // student name
      email: user.domain_id, // student email
      contact: user.phone_number, //student contact
    },
    notes: {
      address: user.hostel, // hostel address
      room_no: user.room_number // room number
    },
    theme: {
      color: "#121212",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};
const StudentDash = () => {
  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    let values: any = {};
    const keys = [
      "domain_id",
      "name",
      "hostel",
      "phone_number",
      "profile_picture",
      "mess_due",
      "room_number",
    ];
    keys.forEach((key) => {
      values[key] = localStorage.getItem(key);
    });
    let rollNumber = 1234;
    values.roll_number = rollNumber;
    setUser(values);
  }, []);
  function handleToggle() {
    setToggle(!toggle);
  }
  const issueQuery = useQuery({
    queryKey: ["studentIssues"],
    queryFn: getStudentIssues,
  });
  const issues: any = issueQuery.data;
  const visible =
    "max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:min-w-[100svw] max-sm:min-h-[100svh] max-sm:z-50 customSlideLeft";
  const hidden = "max-sm:hidden";
  const [viewIssues, setViewIssues] = useState(false);

  return (
    <div
      className={`container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-[#000] relative ${toggle ? "max-h-[100svh] overflow-hidden" : ""
        }`}
    >
      <GiHamburgerMenu
        className="text-[#ffffff] text-4xl cursor-pointer self-start fixed top-2 left-2 sm:hidden"
        onClick={handleToggle}
      />
      <div
        className={`profile flex flex-col items-center gap-[8rem] bg-[#222831] min-w-[23svw] min-h-[94svh] pt-5 rounded-md ${toggle ? visible : hidden
          }`}
      >
        <GiHamburgerMenu
          className="text-[#ffffff] text-4xl cursor-pointer self-start absolute top-2 left-2 sm:hidden"
          onClick={handleToggle}
        />
        <StudentProfile />
        <div className="flex flex-col items-center gap-4 mb-10 mt-auto">
          <RebateForm />
          <Button name="Pay Mess Dues" handleOnClick={() => MessPaymentHandler(user)} />
          {viewIssues ? (
            <Button
              name="Report Issue"
              handleOnClick={() => {
                setViewIssues(false);
                setToggle(!toggle);
              }}
            />
          ) : (
            <Button
              name="View Issues"
              handleOnClick={() => {
                setViewIssues(true);
                setToggle(!toggle);
              }}
            />
          )}
        </div>
      </div>
      <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex max-sm:flex-col justify-between max-sm:justify-evenly items-center max-sm:max-w-[100svw] overflow-hidden">
        {viewIssues ? (
          issueQuery.isLoading ? (
            <h1>Fetching Issues</h1>
          ) : (
            <ViewIssues issues={issues} />
          )
        ) : (
          <IssueForm setViewIssues={setViewIssues} />
        )}
      </div>
    </div>
  );
};
export default StudentDash;
