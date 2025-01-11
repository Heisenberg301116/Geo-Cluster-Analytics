import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import styled from 'styled-components'

// images
import cancel_img from '../images/cancel.png'

const StyledDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'colour'
})`
    position: fixed;
    box-sizing: border-box;
    top: 1.5px;
    margin: 0 0.3rem;
    width: calc(100% - 0.6rem);
    z-index: 10000;
    border: 2px solid black;
    // border-radius: 0.5rem;
    text-align: center;
    background-color: ${(props) => props.colour};
    color: white;
    padding: 0.5rem;

    &:hover {
        transform: scale(1.003);        
    }
`

const Alert = () => {
    const { alert, setalert } = useContext(DataContext);
    const [timeoutID, settimeoutID] = useState(null);

    // useEffect(() => {
    //     if (timeoutID === null && alert.colour !== '') {
    //         const id = setTimeout(() => {
    //             setalert({ colour: '', message: '' });
    //         }, 3000)

    //         settimeoutID(id);
    //     }
    //     else {
    //         clearTimeout(timeoutID);
    //         settimeoutID(null)

    //         const id = setTimeout(() => {
    //             setalert({ colour: '', message: '' });
    //         }, 2000)

    //         settimeoutID(id);
    //     }

    // }, [alert])

    useEffect(() => {
        // console.log("=============> inside useeffct alert")
        if (alert.colour !== '') {
            const id = setTimeout(() => {
                setalert({ colour: '', message: '' });
            }, 2000)

            settimeoutID(id);
        }
        else {
            clearTimeout(timeoutID);
            settimeoutID(null)
        }

    }, [alert])

    const setIsHovered = () => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID)
        }
    }

    const setIsNotHovered = () => {
        const id = setTimeout(() => {
            setalert({ colour: '', message: '' });
        }, 2000)

        settimeoutID(id);
    }

    const handleClose = () => {
        clearTimeout(timeoutID);
        setalert({ colour: '', message: '' });
        settimeoutID(null);
    }

    return (
        alert.colour !== '' ? (
            <StyledDiv colour={alert.colour}
                onMouseEnter={setIsHovered}
                onMouseLeave={setIsNotHovered}
            >
                <p style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    color: alert.fontcolor ? alert.fontcolor : 'white',
                }}>
                    {alert.message}
                </p>

                <img onClick={handleClose} src={cancel_img} alt="Close alert" style={{ height: '70%', position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer' }} />

            </StyledDiv>
        )

            :

            null
    );
};

export default Alert;