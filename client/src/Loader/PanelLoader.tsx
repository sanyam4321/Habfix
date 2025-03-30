
export const PanelLoader = () => {
  try {
    return (
        <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center animate-pulse duration-500">
        </div>
    )
  } catch (error) {
    return (
        <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-center items-center duration-500">
            <h1 className="text-white text-5xl font-semibold">SOMETHING WENT WRONG</h1>
        </div>
    )
  }
}
