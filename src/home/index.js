import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUserNurse } from "react-icons/fa";
import { useDispatch, useSelector, } from "react-redux";
import { useLocation } from "react-router-dom";
import Add from "../add";

import './home.css';

const Home = () => {
    const [direction, setDirection] = useState('Rigth-to-left');
    const { person, giant } = useSelector((state) => state.ship);

    const dishpatch = useDispatch();

    const handleDirection = useCallback((directions) => {
        if (directions === 'left') {
            setDirection('Left-to-rigth');
            return;
        };
        setDirection('Rigth-to-left');
    }, [setDirection]);
    const _createEntity = (type) => {
    }

    return (
        <>
            <Button onClick={() => _createEntity('person')}>Create</Button>
            <>
                <Tooltip title="Delete" placement="top" className="m-5">
                    <Button>Add</Button>
                </Tooltip>


                <span role='alert'>fer</span>
            </>
        </>
    )
}
export default Home 