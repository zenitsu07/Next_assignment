import Admission from "../model/Admission.js";


const CompletePayment = ( user, selectedBatch)=>{
    //Function Implementation
    
}


    export const handleResponse = async (request,response) =>{
    try{
        const{name, age, selectedBatch} = request.body;

        if (!name || !age || !selectedBatch) {
            return res.status(400).json({ message: 'Please provide all required information.' });
        }
    
        // Age validation
        if (!(age >= 18 && age <= 65)) {
        return res.status(400).json({ message: 'Invalid age. Age must be between 18 and 65.' });
        }
    
        // Batch validation
        const validBatches = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];
        if (!validBatches.includes(selectedBatch)) {
        return res.status(400).json({ message: 'Invalid batch selection.' });
        }

        //using COmplete Payment fucntion to call payment action
        const paymentResponse = CompletePayment({name, age}, selectedBatch)

        if(paymentResponse.success){
            return res.status(200).json({message:  'You are Successfully Enrolled'})
            
        }else{
            return res.status(401).json({message:  ' Payment failed. PLease try again'})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: 'Internal server error.'})
    }
    }