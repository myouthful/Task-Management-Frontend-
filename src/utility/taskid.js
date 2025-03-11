function generateTaskId() {
    // Generate a random 4-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    // Combine 'TSK' with the random number
    return `TSK${randomNum}`;
}

export default generateTaskId;


// how to import and use


//import generateTaskId from '../utility/taskid';

// Usage example
//const newTaskId = generateTaskId(); // Returns something like "TSK4567"