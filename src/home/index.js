import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { FaUserNurse } from "react-icons/fa";
import { createContainer, createEntity, createGame } from "./home";
import $ from 'jquery';
import './home.css';

const myGame = createGame();
const mountain1 = createContainer('left', 'mountain');
const mountain2 = createContainer('right', 'mountain');
const boat = createContainer('right', 'boat');

mountain2.entity.push(createEntity('priest'),
    createEntity('priest'),
    createEntity('devil'),
    createEntity('devil'),
    createEntity('priest'),
    createEntity('devil'));

const Home = () => {
    const [update, setUpdate] = useState("");

    useEffect(() => {
        myGame.setSubscribe(() => {
            setUpdate(Math.random().toString());
        });
    }, [setUpdate]);

    const handleEntity = useCallback((obj, item) => {
        if (obj.type === 'mountain' && boat.entity.length < 2 && obj.direction === boat.direction) {
            myGame.removeEntity(obj, item.id);
            myGame.addEntity(boat, item);
            return;
        };
        myGame.removeEntity(obj, item.id);
        let mountains = { right: mountain2, left: mountain1 }
        let curMountain = mountains[obj.direction] || null;
        curMountain && myGame.addEntity(curMountain, item);
    }, []);

    const moveContainer = useCallback((boatObj) => {
        if (boatObj.entity.length === 0) {
            return;
        };

        let mountains = { right: mountain2, left: mountain1 }
        let curMountain = mountains[boatObj.direction] || null;
        myGame.checkContainerStatus(curMountain);
        if (myGame.isGameOver) {
            $("#boat-container").stop();
            return;
        };
        let animationValue = boatObj.direction === 'right' ? '45rem' : '-=45rem';
        $("#boat-container").animate({ right: animationValue }, 1500, 'linear');
        myGame.moveBoatContainer(boatObj);
    }, []);

    const onRestart = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className="border border-1 w-50 m-5 p-2">
            {
                myGame.isGameOver && <div className="d-flex align-items-center justify-content-start">
                    <div>
                        <h5><b>{mountain1.entity.length == 6 ? 'you are win' : 'Game over'}</b></h5>
                    </div>
                    <div className="mx-2">
                        <Button className="p-2 btn btn-danger" onClick={() => onRestart()}>Play Again</Button>
                    </div>
                </div>
            }

            <hr />
            <div className="d-flex align-items-center justify-content-between">

                <div className="container-one mx-4">
                    {
                        mountain1.entity.map((item, index) => (
                            <Fragment key={index}>
                                {item.type === 'priest' ?
                                    <FaUserNurse className="fs-3 text-info p-1 my-2 entity-icon" onClick={() => handleEntity(mountain1, item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(mountain1, item)} />}
                            </Fragment>
                        ))
                    }
                </div>

                <div className="container-one mx-4">
                    {
                        mountain2.entity.map((item, index) => (
                            <Fragment key={index}>
                                {item.type === 'priest'
                                    ? <FaUserNurse className="fs-3 text-info p-1 my-2  entity-icon" onClick={() => handleEntity(mountain2, item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(mountain2, item)} />}
                            </Fragment>
                        ))
                    }
                </div>
            </div>

            <div className="p-2 boat-container" id="boat-container">
                {
                    boat.entity.map((item, index) => (
                        <Fragment key={index}>
                            {item.type == 'priest'
                                ? <FaUserNurse className="fs-3 text-info p-1 my-2  entity-icon" onClick={() => handleEntity(boat, item)} />
                                : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(boat, item)} />}
                        </Fragment>
                    ))
                }
            </div>
            <hr />
            <Button className="px-3  btn btn-primary" onClick={() => moveContainer(boat)} id='goBtn'><b>Go</b></Button>
        </div>
    )
}
export default Home 