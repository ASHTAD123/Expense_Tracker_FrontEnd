 const FormFieldError = ({ message }) => {

  if (message == undefined || message === null) return <></>;

  return (
    <>
      {
        <div>
          <li className="error-message">{message}</li>   
        </div>
      }
    </>
  );
};
export default FormFieldError;