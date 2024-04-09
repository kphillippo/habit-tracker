import {apiRequest} from "../../utils/reqTool"

export function handleMail( email, subject, text, toast, html) {
    //event.preventDefault();
    let info = {
        "to": email,
        "subject": subject,
        "text": text,
        "html": html
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
