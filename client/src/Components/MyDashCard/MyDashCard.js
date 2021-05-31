import React , {useEffect,useState} from "react";
import {Card, Button,Spinner} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { infoDash, loadDash } from "../../Redux/actions/dashboard";
const MyDashCard = ({dashid,history}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(infoDash({dashID:dashid}))

  }, []) 

  const temp = useSelector((state) => state.dashboardReducer);
  const[isLoading,setIsLoading]= useState(true)
  const[title,setTitle]= useState("")
  const[members,setMembers]= useState([])
  if((temp.dashID === dashid) && (isLoading)){
    
    setTitle(temp.title)
    setIsLoading(false)
    setMembers(temp.members)
  }
  const handleClick = () =>{
    dispatch(loadDash({dashID:dashid},history))
  }
  return (
    isLoading ?( 
      <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
      </Spinner> 
      ) : (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          Members : {members.length}
        </Card.Text>
        
        <Button variant="primary" onClick={handleClick}>Go to dashboard</Button>
      </Card.Body>
    </Card>)
  );
};

export default MyDashCard;
