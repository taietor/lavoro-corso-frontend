const button = ({ label, iconUrl }) => {
  return (
    <button className="flex justify-center items-center gap-2 px-6 py-4 border fondt-montserrat text-lg leading-none bg-coral-red border-coral-red rounded-full text-white">
      {label}
      {<img src={iconUrl} alt="icon" className="ml-2 rounded-full  w-5 h-5" />}
    </button>
  );
};

export default button;
