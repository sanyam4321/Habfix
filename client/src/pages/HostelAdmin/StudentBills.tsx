import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'
import { Dialog, DialogContent, DialogClose, DialogTrigger } from '@/components/ui/dialog'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBills, submitNewBill } from '../../api/hostelAdminQueries'
import toast from 'react-hot-toast'

export const StudentBills = () => {

  const getStudentBills = useQuery({
    queryKey: ['studentBills'],
    queryFn: getBills
  });

  const [newBill, setNewBill] = useState({
    name: '',
    domain_id: '',
    mess_due: '',
  });

  const queryClient: QueryClient = useQueryClient();
  const updateStudentBill = useMutation({
    mutationFn: submitNewBill,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['studentBills'] });
    }
  });

  if (getStudentBills.isLoading) {
    return (<p>Fetching Bills</p>);
  }

  const bills: any = getStudentBills.data.students;
  if (bills == null || bills == undefined || bills?.length == 0) {
    return (
      <div className='w-[90%] min-h-[90svh] mx-auto my-auto flex flex-col justify-center'>
        <div className="bg-slate-200 flex flex-col items-center justify-evenly my-10 rounded-lg font-bold text-5xl font-sans">
				  NO BILLS FOUND 🎊
			  </div> 
        {/* Add new Bill */}
        <Dialog>
          <DialogTrigger>
            <Button className='mt-auto' variant={'outline'}>Add Bill</Button>
          </DialogTrigger>
          <DialogContent className='bg-black text-white'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold m-2 text-center text-white'>Add Bill</h1>
              <div className='flex flex-col items-center text-black'>
                <input type='text' name='name' placeholder='Name' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
                <input type='text' name='domain_id' placeholder='Student ID' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
                <input type='text' name='mess_due' placeholder='Amount (in Rs.)' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
                <DialogClose><Button className='w-3/4 m-2' onClick={handleSubmit}>Add Bill</Button></DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  function handleOnChange(e: any) {
    setNewBill({
      ...newBill,
      [e.target.name]: e.target.value

    })
  }
  // function handleOnSubmit() {
  //   // If a bill is already issued on that roll no, then update that bill, else add a new bill
  //   let index = bills.findIndex(bill => bill.rollNo == newBill.rollNo)
  //   if(index > -1) {
  //     let newBills = [...bills]
  //     newBills[index] = {
  //       ...newBills[index],
  //       amount: newBill.amount,
  //       status: 'Pending'
  //     }
  //     setBills(newBills)
  //   } else {
  //     setBills([...bills, {...newBill, status: 'Pending'}])
  //   }
  // }

  function handleSubmit() {
    const data: any = {};
    data.student_id = newBill.domain_id;
    data.amount = newBill.mess_due;
    toast.promise(updateStudentBill.mutateAsync(data), {
      loading: 'Adding Bill...',
      success: 'Bill Added Successfully',
      error: 'Error Adding Bill',
    });
  }

  return (
    <div className='w-[90%] min-h-[90svh] mx-auto my-auto flex flex-col justify-center'>
      <h1 className='text-2xl font-bold m-2 text-center text-white'>Pending Student Bills</h1>
      <div className='flex flex-col mb-auto justify-between items-center ml-auto w-full max-h-[70svh] overflow-y-auto customScrollbar'>
        {
          bills.map((bill: any, index: any) => (bill?.mess_due != '0' &&
            <Card key={index} className='flex w-3/4'>
              <CardContent className='flex items-center pb-0 p-2 justify-center w-full'>
                <div className='flex justify-between items-center gap-2'>
                  <Avatar>
                    <AvatarImage src={bill?.profile_picture} />
                    <AvatarFallback>
                      {bill?.name}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className='text-lg font-bold'>{bill?.name}</h2>
                    <p className='text-sm'>{bill?.domain_id}</p>
                  </div>
                </div>
                <div className='ml-auto mr-2'>
                  <p className='text-sm'>{bill?.mess_due}</p>
                </div>
                <div className=''>
                  <Button className='w-full'>View Bill</Button>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
      {/* Add new Bill */}
      <Dialog>
        <DialogTrigger>
          <Button className='mt-auto' variant={'outline'}>Add Bill</Button>
        </DialogTrigger>
        <DialogContent className='bg-black text-white'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold m-2 text-center text-white'>Add Bill</h1>
            <div className='flex flex-col items-center text-black'>
              <input type='text' name='name' placeholder='Name' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
              <input type='text' name='domain_id' placeholder='Student ID' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
              <input type='text' name='mess_due' placeholder='Amount (in Rs.)' className='w-3/4 p-2 m-2 rounded-md' onChange={handleOnChange} />
              <DialogClose><Button className='w-3/4 m-2' onClick={handleSubmit}>Add Bill</Button></DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
