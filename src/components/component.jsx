
// format date to make it look nicer
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are zero-indexed.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


// Convert newlines into array of paragraphs
export const JobDescription = ({ description }) => {
    const formattedDescription = description.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  
    return <div>{formattedDescription}</div>;
};
  

 

