import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap"
import { FaUserNurse } from "react-icons/fa";

import { createContainer, createEntity, createGame } from "./home";
import $ from 'jquery';
import './home.css';

const myGame = createGame();
const mountain1 = createContainer('left', 0, 'mountain');
const mountain2 = createContainer('right', 99, 'mountain');
const boat = createContainer('right', 97, 'boat');
mountain2.entitys.push(createEntity('person',),
    createEntity('person'),
    createEntity('person'),
    createEntity('giant'),
    createEntity('giant'),
    createEntity('giant'))

const Home = () => {
    const [update, setUpdate] = useState("");
    useEffect(() => {
        myGame.setSubscribe(() => {
            setUpdate(Math.random().toString());
        })
    }, [setUpdate]);

    const handleEntity = useCallback((obj, item) => {
        if (obj.type === 'mountain' && boat.entitys.length < 2) {
            myGame.removeEntity(obj, item.id);
            myGame.addEntity(boat, item);
            return;
        };

        if (obj.type === 'boat' && obj.direction === 'right') {
            myGame.removeEntity(obj, item.id);
            myGame.addEntity(mountain2, item);
            return;
        };

        if (obj.type === 'boat' && obj.direction === 'left') {
            myGame.removeEntity(obj, item.id);
            myGame.addEntity(mountain1, item);
        };

    }, [myGame]);

    const moveBoat = useCallback((boatObj) => {
        if (boatObj.entitys.length !== 2 && boatObj.direction === 'right') {
            return;
        };
        if (boatObj.entitys.length !== 1 && boatObj.direction === 'left') {
            return;
        };

        if (boatObj.direction === 'right') {
            myGame.moveBoatContainer(boatObj, mountain2);
            if (myGame.isGameOver === true) {
                return $("#boat_container").stop();
            };
            return $("#boat_container").animate({ right: '45rem' }, 1500, 'linear');
        };

        myGame.moveBoatContainer(boatObj, mountain1);
        if (myGame.isGameOver == true) {
            return $("#boat_container").stop();
        };
        $("#boat_container").animate({ right: '-=45rem' }, 1500, 'linear');

    }, [boat, mountain2, mountain1]);

    const onRestart = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className="border border-1 w-50 m-5 p-2">
            {
                myGame.isGameOver && <h5>game over</h5>
            }
            {myGame.isGameOver && <Button className="p-2" onClick={() => onRestart()}>restart</Button>}
            <hr />
            <div className="d-flex align-items-center justify-content-between">
                <div className="container-one border border-1 mx-4">
                    {
                        mountain1.entitys.map((item, index) => (
                            <>
                                {item.type == 'person' ?
                                    <FaUserNurse className="fs-3 text-info p-1 my-2" onClick={() => handleEntity(mountain1, item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2" onClick={() => handleEntity(mountain1, item)} />}
                            </>
                        ))
                    }
                </div>
                <div className="border border-1 container-one mx-4">
                    {
                        mountain2.entitys.map((item, index) => (
                            <>
                                {item.type == 'person' ?
                                    <FaUserNurse className="fs-3 text-info p-1 my-2" onClick={() => handleEntity(mountain2, item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2" onClick={() => handleEntity(mountain2, item)} />}
                            </>

                        ))
                    }
                </div>
            </div>

            <div className="p-2 boat-container border border-1" id="boat_container">
                {
                    boat.entitys.map((item, index) => (
                        <>
                            {item.type == 'person' ?
                                <FaUserNurse className="fs-3 text-info p-1 my-2" onClick={() => handleEntity(boat, item)} />
                                : <FaUserNurse className="fs-3 text-danger p-1 my-2" onClick={() => handleEntity(boat, item)} />}
                        </>
                    ))
                }
            </div>
            <hr />
            <Button className="p-2" onClick={() => moveBoat(boat)} id='goBtn'>Go</Button>
        </div>
    )
}
export default Home 