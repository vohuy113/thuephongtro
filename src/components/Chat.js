import React, { useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import { onValue, child, ref, off, push, get, set } from "firebase/database";
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';
import { AuthContext } from '../api/AuthApi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { currentUser } = useContext(AuthContext);
    const { postId } = useParams();
    const [listPosted, setListPosted] = useState([]);
    useEffect(() => {
        // Lắng nghe sự thay đổi trong nút "messages" trong cơ sở dữ liệu Firebase
        const dbRef = ref(database);
        get(child(dbRef, `Users/${currentUser.uid}/listPosted`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setListPosted(Object.keys(snapshot.val()));
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
        const messagesRef = ref(database, `messages/${postId}`);
        onValue(messagesRef, (snapshot) => {
            //const data = snapshot.val();
            //console.log(data)
            const messageList = snapshot.val();
            if (messageList) {
                const messages = Object.values(messageList);
                setMessages(messages);
            } else {
                setMessages([]);
            }
        });
        // console.log(messages)

        // Hủy đăng ký lắng nghe khi component unmount
        // return () => {
        //     messagesRef.off('value');
        // };
    }, []);
    console.log(listPosted)
    const [isCheck, setIsCheck] = useState(false);
    useEffect(() => {
        if (listPosted.includes(postId) || messages[0]?.senderId == currentUser.uid) {
            console.log(messages)
            setIsCheck(true)
        }
        else setIsCheck(false)
    }, [listPosted, messages])
    console.log(postId)
    console.log(messages[0]?.senderId)
    console.log(currentUser.uid)
    const sendMessage = () => {
        if (newMessage !== '') {
            // Ghi dữ liệu tin nhắn mới vào cơ sở dữ liệu Firebase
            const messagesRef = ref(database, `messages/${postId}`);
            push(messagesRef, {
                content: newMessage,
                senderId: currentUser.uid,
                timestamp: Date.now()
            })
            // Reset ô nhập tin nhắn
            setNewMessage('');
        }
    };
    const [hoveredItemId, setHoveredItemId] = useState(null);

    const handleMouseEnter = (itemId) => {
        setHoveredItemId(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItemId(null);
    };
    const [showTooltip, setShowTooltip] = useState(false);

    const handleIconClick = () => {
        setShowTooltip(!showTooltip);
    };

    const handleRemoveClick = () => {
        // Xử lý logic khi người dùng nhấp vào nút "Remove"
        console.log('Remove clicked');
    };
    return (
        <div className='bg-white mx-2 w-[316px] h-[580px] flex flex-col justify-between rounded-md  '>
            <div style={{ overflowY: 'scroll' }}>
                {/* <div>
                    {isCheck && messages.map((message) => (
                        // <div className='flex items-center'>
                        //     <BiDotsHorizontalRounded />
                        //     <div className={`p-2 rounded-2xl m-2 w-1/2  ${message.senderId == currentUser.uid ? 'ml-auto' : 'mr-auto'}`}
                        //         key={message.timestamp}
                        //         style={{
                        //             background: message.senderId == currentUser.uid ? "#0084ff" : "#e4e6eb"
                        //         }}
                        //     >{message.content}
                        //     </div>
                        // </div>
                    ))}
                </div> */}
                <div>
                    {isCheck &&
                        messages.map((message) => (
                            <div className='flex items-center'
                                onMouseEnter={() => handleMouseEnter(message.timestamp)}
                                onMouseLeave={handleMouseLeave}
                                key={message.timestamp}
                            >
                                {message.senderId === currentUser.uid ? (
                                    <>
                                        <div className='relative'>
                                            {hoveredItemId === message.timestamp && <BiDotsHorizontalRounded className="mr-2 cursor-pointer" onClick={handleIconClick} />}
                                            {showTooltip && hoveredItemId === message.timestamp && (
                                                <div className="absolute top-[-30px] left-0">
                                                    <button onClick={handleRemoveClick}>Remove</button>
                                                </div>)}
                                        </div>
                                        <div
                                            className={`p-2 rounded-2xl m-2 w-1/2 ml-auto`}
                                            key={message.timestamp}
                                            style={{
                                                background: "#0084ff",
                                                color: "#fff"
                                            }}
                                        >
                                            {message.content}
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div
                                            className={`p-2 rounded-2xl m-2 w-1/2 mr-auto`}
                                            key={message.timestamp}
                                            style={{
                                                background: "#e4e6eb",
                                            }}
                                        >
                                            {message.content}
                                        </div>
                                        {hoveredItemId === message.timestamp && <BiDotsHorizontalRounded className="ml-2 cursor-pointer" onClick={handleIconClick} />}
                                    </>
                                )}
                            </div>
                        ))}
                </div>

            </div>
            <div className=' flex rounded-2xl m-2'>
                <input
                    className='w-5/6 overflow-hidden py-1 px-2 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    type="text"
                    placeholder='Aa'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className='py-1 px-2 w-1/6 bg-blue-500 text-white rounded-2xl' onClick={sendMessage}>Send</button>
            </div>

        </div>

    );
};

export default Chat;
