import { useState} from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {

    const BASE_API_ADD = process.env.REACT_APP_BASE_CALL

    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post(`${BASE_API_ADD}/message`, { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
        console.log(message)
    }

    return (
        <div className='absolute w-full bottom-0 p-5 bg-slate-200 flex flex-col '> 
            <textarea className='border border-gray-600 rounded-sm' value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="mt-5 m-3 rounded-full bg-slate-200 border border-zinc-400 ml-14 mr-16" onClick={addMessage}>Submit</button>
        </div>
    )
    
  }
  
  export default ChatInput