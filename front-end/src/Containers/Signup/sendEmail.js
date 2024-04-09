import {apiRequest} from "../../utils/reqTool"

export function handleMail( email, subject, text, toast) {
    //event.preventDefault();
    let info = {
        "to": email,
        "subject": subject,
        "text": text
    }
    apiRequest("POST", "verification/sendEmail", info)
        .then(({token, ...user}) => {
            toast.success(`Email has been sent to ${user.Email}!`)
        })
        .catch(err => {
            toast.error(err.error);
        })
    console.log('Email has been sent to', email);
}
