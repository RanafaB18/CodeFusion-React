const Button = ({ text }) => (
  <button
    className="bg-bluish text-white text-lg
                font-semibold py-3 mt-2 rounded-md hover:bg-blue-500"
    type="submit"
  >
    {text}
  </button>
);

export default Button
