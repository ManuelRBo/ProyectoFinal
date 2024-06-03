import PropTypes from 'prop-types';

export default function BotonAutenticar({ texto, onClick, className }) {
  return (
    <button
        onClick={onClick}
        className={`text-2xl w-full font-inter bg-gradient-to-r from-[#9146EE] to-[#0085FF] text-white font-bold py-2 rounded focus:outline-none hover:from-[#0085FF] hover:to-[#9146EE] transition duration-500 ${className}`}
    >
      {texto}
    </button>
  );
}

BotonAutenticar.propTypes = {
  texto: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}