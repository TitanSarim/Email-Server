import React from 'react'


interface Email {
    user_id: string;
    email_id: number;
    body: string;
  }
  
  interface EmailListsProps {
    data: Email[];
  }

  const EmailLists: React.FC<EmailListsProps> = ({ data }) => {

    const extractWords = (text: string, wordCount: number) => {
        // Split the text into words
        const words = text.split(' ');
        // Extract the specified number of words
        const extractedWords = words.slice(0, wordCount).join(' ');
        return extractedWords;
      };

  return (
    <div className='relative w-[550px] border-solid border-r-[1px] h-[98vh] border-gray-300'>

        <div className='w-[100%] border-b-[1px] pb-4 border-gray-300 h-[57px] flex items-center justify-start '>
            <p className='relative left-4 top-1 text-2xl font-semibold text-gray-700'>Inbox</p>
        </div>

        <div className='relative top-4 w-[100%] flex flex-col items-center justify-center bg-white gap-3'>
            {/* {data.map((item) => ( */}
                {/*<div key={item.email_id} className='border-solid border-[1px] border-gray-300 rounded-md w-[95%] bg-white h-[60px] cursor-pointer'>*/}
                //     {/* <div dangerouslySetInnerHTML={{ __html: extractWords(item.body, 12)}}></div> */}
                {/* </div>*/}
            {/* ))} */}
        </div>

    </div>
  )
}

export default EmailLists