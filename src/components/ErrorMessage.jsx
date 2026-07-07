function ErrorMessage({message , onRetry}){
    return(
        <div className="error-card">
            <span className="error-icon">
              ⚠️  
            </span>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button className="retry-btn" onClick={onRetry}>Try again</button>
            )}
        </div>
    );
}


export default ErrorMessage;