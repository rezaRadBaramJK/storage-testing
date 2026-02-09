const OrderStatusLoading = () => {
  return (
    <div className="animate-pulse flex flex-col min-h-screen">
      <div className="bg-loading-base-50 rounded-3xl self-center w-32 h-2 mt-3" />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center justify-center flex-1">
          <div className="size-64 bg-loading-base-50 rounded-xl" />
        </div>
        <div className="flex flex-col flex-1 px-6">
          <div className="flex flex-col gap-3">
            <div className="bg-loading-base-50 rounded-3xl w-64 h-4" />
            <div className="bg-loading-base-50 rounded-3xl w-full h-3" />
          </div>
          <div className="w-72 flex flex-col items-center justify-center gap-4 m-auto">
            <div className="rounded-[32px] w-full h-11 bg-loading-base-50"/>
            <div className="rounded-[32px] w-full h-11 bg-loading-base-50"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatusLoading
