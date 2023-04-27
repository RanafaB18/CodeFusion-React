import Person from "./Person"

const Message = ({message, username, time}) => {
    return (
        <div className="p-3 font-semibold flex justify-end">
            <div className="text-white text-opacity-60 flex h-full items-end
            gap-2 p-2 pb-0 rounded-lg bg-blackhover">
                {/* message */}
                <p className="text-white pb-3 text-opacity-90">{message}</p>
                <div className="flex flex-col items-center gap-3">
                    {/* username
                    time */}
                    <span>{username}</span>
                    <span>{time}</span>
                </div>
            </div>
            {/* Should be on current message */}
            <Person name={username} showOnlyCircle color="white" />
        </div>
    )
}

export default Message
