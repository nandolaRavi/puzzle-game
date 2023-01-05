import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaUserNurse } from "react-icons/fa";
import $ from 'jquery';
import './home.css';
import { useDispatch, useSelector } from "react-redux";
import { addRemoveEntity, createEntity, moveBoat } from "../redux/boatSlice";

const Home = () => {
    const dishpatch = useDispatch();

    const { mountain2, mountain1, boat, isGameOver, movePx } = useSelector((state) => state.ship);
    mountain2.entity.push(
        createEntity('priest'),
        createEntity('priest'),
        createEntity('devil'),
        createEntity('devil'),
        createEntity('priest'),
        createEntity('devil')
    );

    const handleEntity = useCallback((obj) => {
        dishpatch(addRemoveEntity({ obj: obj }))
    }, [dishpatch]);

    const moveContainer = useCallback((boatObj) => {
        dishpatch(moveBoat({ boatObj: boatObj }));
        if (isGameOver) {
            $("#boat-container").stop();
            return;
        };
        $("#boat-container").animate({ right: `${movePx}` }, 10000, 'linear');
    }, [dishpatch]);

    const onRestart = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className="border border-1 w-50 m-5 p-2">
            {
                isGameOver && <div className="d-flex align-items-center justify-content-start">
                    <div>
                        <h5><b>Game over</b></h5>
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
                                    <FaUserNurse className="fs-3 text-info p-1 my-2 entity-icon" onClick={() => handleEntity(item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(item)} />}
                            </Fragment>
                        ))
                    }
                </div>

                <div className="container-one mx-4">
                    {
                        mountain2.entity.map((item, index) => (
                            <Fragment key={index}>
                                {item.type === 'priest'
                                    ? <FaUserNurse className="fs-3 text-info p-1 my-2  entity-icon" onClick={() => handleEntity(item)} />
                                    : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(item)} />}
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
                                ? <FaUserNurse className="fs-3 text-info p-1 my-2  entity-icon" onClick={() => handleEntity(item)} />
                                : <FaUserNurse className="fs-3 text-danger p-1 my-2  entity-icon" onClick={() => handleEntity(item)} />}
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