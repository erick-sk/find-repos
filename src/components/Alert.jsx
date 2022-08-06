const Alert = ({ error }) => {
  return (
    <div
      className="bg-red-100 rounded-lg py-5 px-10 text-base text-red-700"
      role="alert"
    >
      <span className="font-medium">{error}</span>
    </div>
  );
};

export default Alert;
