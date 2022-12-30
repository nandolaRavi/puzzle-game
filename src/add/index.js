import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { createGiant, createPerson } from "../redux/boatSlice";
import { useDispatch } from "react-redux";


const Add = () => {
    const dishpatch = useDispatch()
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const createUsers = () => {
        if (name === '') {
            alert('something went wrong');
            setShow(false)
            return;
        };
        if (name === 'enemies') {
            dishpatch(createGiant());
            setShow(false)
            return;
        }
        dishpatch(createPerson());
        setShow(false)
    };


    return (
        <>
            <>
                <Button variant="primary" onClick={() => setShow(true)} className="p-2">
                    Add
                </Button>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user or enemies</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl className="w-100 m-1" size="small">
                            <InputLabel id="demo-select-small">select type</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={name}
                                label="select File Dir"
                                onChange={handleChange}
                            >
                                <MenuItem value={'enemies'}>Enemies</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='text-white bg-danger'>Close</Button>
                        <Button variant="primary" onClick={() => createUsers()}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}

export default Add