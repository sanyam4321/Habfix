
const DashboardLoader = () => {
  return (
    // Will create skeleton loader for the dashboard using tailwind css animation
    <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-600">
            <div className="profile flex flex-col items-center bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md p-4 animate-pulse duration-500">
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center animate-pulse duration-500">
            </div>
        </div>
  )
}

export default DashboardLoader;