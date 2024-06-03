import PropTypes from 'prop-types';

export default function InputForm({ label, type, placeholder, register, error }) {
  
    return (
      <div className="flex flex-col">
        <label htmlFor={label.toLowerCase()} className="text-base font-inter">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={label.toLowerCase()}
          {...register} 
          className={`w-full border-2 p-1 ${error ? 'border-red-500' : 'border-[#004280]'}`}
        />
        {error && <p className="text-red-500 text-xs font-inter">{error.message}</p>}
      </div>
    );
  }
  

InputForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.object
}