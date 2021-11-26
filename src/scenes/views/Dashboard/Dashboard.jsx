import Button from "@restart/ui/esm/Button"
import { useState } from "react"
import { Modal } from "react-bootstrap";
import SideBar from '../SideBar/SideBar';
import TaskDisplay from '../DBTasksDisplay/TasksDisplay'
import { Task } from "../Task/Task"
import './dashboard.scss'
import firebase from "../../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ref = firebase.firestore()
    const user = useSelector(state => state.user) //State of user

    //Getting owned projects from db
    const query = user?.uid && ref.collection("projects").where("created_by", "==", user.email)
    const [ownedProjects] = useCollectionData(query, { idField: "id" })

    //Getting assigneed projects from db
    const assigneeQuery = user?.uid && ref.collection("projects").where("projectAssigneesEmails", "array-contains", user.email)
    const [assigneeProjects] = useCollectionData(assigneeQuery, { idField: "id" });

    //Getting assigneed boards from db
    const boardsQuery = user?.uid && ref.collectionGroup("boards").where("boardAssignees", "array-contains", user.email)
    const [boards] = useCollectionData(boardsQuery, { idField: "id" });

    //To update component with live owned projects and assigned projects
    useEffect(() =>  {
    }, [user, ownedProjects, assigneeProjects , boards ])
    return (
        <>
            <SideBar ownedProjects={ownedProjects} assigneeProjects={assigneeProjects} boards={boards} />
            <TaskDisplay />
            <div>

                <Button className="addTask text-white" variant="primary" onClick={handleShow}>
                    +Task
                </Button>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modalTask">
                    <Modal.Body>   <Task></Task>  </Modal.Body>
                    <Modal.Footer>
                        <Button className="closeBtn" onClick={handleClose}>  Close </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default Dashboard;