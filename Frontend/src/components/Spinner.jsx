import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <TailSpin
        height="70"
        width="70"
        color="#6b21a8"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
