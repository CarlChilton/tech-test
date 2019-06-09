export default [
	[
        {
            element: "input",
            name: "first_name",            
            label: "First name",
            type: "text", 
            attributes: "required",
            pattern: "[A-Za-z]"
        }, 
        {
            element: "input",
            name: "last_name",
            label: "Last name",
            type: "text", 
            attributes: "",
            pattern: "[A-Za-z]"
        }, 
        {
            element: "input",
            name: "email",
            label: "Email",
            type: "email",
            attributes: "required",
            pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"
        },
        {
            element: "input",
            name: "phone_number",
            label: "Phone number",
            type: "number",
            attributes: "",
            pattern: ""
        },
        {
            element: "input",
            name: "live_in_uk",
            label: "Do you live in the uk?",
            type: "checkbox",
            attributes: "required",
            pattern: ""
        }
    ],
    [
        {
            element: "input",
            name: "git_profile",
            label: "Git profile",
            type: "text", 
            attributes: "required",
            pattern: ""
        } 
    ],
    [
        {
            element: "input",
            name: "cv",
            label: "Upload CV",
            type: "file", 
            attributes: "required",
            pattern: ""
        },
        {
            element: "input",
            name: "cover_letter",
            label: "Upload Cover Letter",
            type: "file", 
            attributes: "",
            pattern: ""
        }
    ],
    [
        {
            element: "input",
            name: "about_you",
            label: "About you",
            type: "text", 
            attributes: "required",
            pattern: ""
        }
    ],
]