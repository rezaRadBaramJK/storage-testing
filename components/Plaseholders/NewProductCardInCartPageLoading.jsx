const NewProductCardInCartPageLoading = () => {
  return (
    <div className="bg-productCard-bg rounded-[10px] animate-pulse">
      <div className="flex gap-2 p-2">
        <div className="w-[30%]  h-[110px] bg-loading-base-50  rounded-[5px]" />
        <div className="w-[70%] relative flex flex-col justify-between">
          <div>
            <p className="w-[50%] h-2 bg-loading-base-50 my-3 rounded" />
            <p className="w-[50%] h-2 bg-loading-base-50 my-3 rounded" />
          </div>
          <div className="w-full flex justify-between items-center mt-3">
            <div className=" flex justify-center items-center gap-2  ">
              <div className="size-[25px] bg-loading-base-50 rounded-[5px]" />
              <div className="w-[45px] h-[25px] bg-loading-base-50 rounded-[5px]" />
              <div className="size-[25px] bg-loading-base-50 rounded-[5px]" />
            </div>
            <div className="size-8 rounded-[5px] bg-loading-base-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductCardInCartPageLoading;
