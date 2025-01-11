import { useContext } from 'react';
import { DataContext } from "../context/DataProvider";

// images
import spinner_gif from '../images/spinner.gif'

const LoadingSpinner = () => {
    const { isLoading } = useContext(DataContext);

    // Conditional rendering inside return
    return (
        isLoading && (
            <img
                src={spinner_gif}
                alt="Loading..."
                style={{
                    width: '5rem',
                    height: '5rem',
                    position: 'fixed',
                    top: '5px',
                    left: '50%',
                    zIndex: '6'
                }}
            />
        )
    );
};

export default LoadingSpinner;
