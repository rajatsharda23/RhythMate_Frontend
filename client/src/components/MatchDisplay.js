import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const MatchDisplay = ({ matches, setClickedUser }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [matchedProfiles, setMatchedProfiles] = useState(null)

    const BASE_API_ADD = process.env.REACT_APP_BASE_CALL

    const userId = cookies.UserId;
    const matchedUserIds = matches.map(( {user_id} ) => user_id)
    const getMatches = async () => {
        try{
            const resposne = await axios.get(`${BASE_API_ADD}/users`, {
                params: {userIds : JSON.stringify(matchedUserIds)}
            })
            setMatchedProfiles(resposne.data)
            // console.log(resposne.data)
        } catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getMatches() 
    },[matches])

    const filteredMatchedProfiles = matchedProfiles?.filter(
        (matchedProfile) =>
          matchedProfile.matches.filter((profile) => profile.user_id === userId)
            .length > 0
      );
    

    return (
        <div className="m-2 mt-40 p-2"> 
            {filteredMatchedProfiles?.map((match)=>(
                <div key={match.user_id} className="match-card" onClick={() => setClickedUser(match)}>
                    <div className="img-container">
                        <img src={match?.url} alt={match?.first_name + 'profile'}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
            ))}
        </div>
    )
    
  }
  
  export default MatchDisplay