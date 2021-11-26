import { useEffect } from "react";
import {  BiHomeSmile, } from "react-icons/bi";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SideBar({ assigneeProjects, ownedProjects, boards }) {

  useEffect(() => {

  }, [boards])
  return (
    <div className="viewsSection ">
      <div className="sidebar close">
        <ul className="nav-links">
          <li>
            <Link className="nav-links-item" to="/">
              <BiHomeSmile className="link-icon"></BiHomeSmile>
              <span className="link-name">Home</span>
            </Link>
          </li>
          <li>
            <button className="nav-links-item">
              <BiHomeSmile className="link-icon"></BiHomeSmile>
              <span className="link-name">Notification</span>
            </button>
          </li>

          <li>
            {assigneeProjects?.map((project, i) => (
                  <Accordion key={i}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                      <Typography>{project.project}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {boards?.map((board, index) => (
                        <>
                        if (board.project_id === project.id) {
                          <div key={index}>{board.board_name}</div>
                        }
                        </>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SideBar;
