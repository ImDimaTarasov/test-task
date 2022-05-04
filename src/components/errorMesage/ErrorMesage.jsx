import img from './error-loading.gif';

const ErrorMessage = () => {
    return(
        <img style={{ display: 'block', width:"500px", objectFit:"contain", margin:"0 auto"}} src={img} alt="Error"/>
    )
}
export default ErrorMessage;