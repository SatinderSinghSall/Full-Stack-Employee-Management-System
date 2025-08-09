const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl ${color}`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{text}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
