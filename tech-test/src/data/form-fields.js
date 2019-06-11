export default [
	[   
    
        {
            element: "input",
            name: "first_name",            
            label: "First name",
            type: "text", 
            required: true,
            pattern: "[A-Za-z ]+",
            dataTarget: "first_name"
        }, 
        {
            element: "input",
            name: "last_name",
            label: "Last name",
            type: "text", 
            required: false,
            pattern: "[A-Za-z ]+",
            dataTarget: "last_name"
        }, 
        {
            element: "input",
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$",
            dataTarget: "email"
        },
        {
            element: "input",
            name: "phone_number",
            label: "Phone number",
            type: "number",
            required: false,
            pattern: "^[0-9]",
            dataTarget: "phone_number"
        },        
        {
            element: "input",
            name: "live_in_uk",
            label: "Do you live in the uk?",
            type: "checkbox",
            required: true,
            dataTarget: "live_in_uk"
        }
    ],
    [
        {
            element: "input",
            name: "git_profile",
            label: "Git profile",
            type: "search", 
            required: false,            
            dataTarget: "git_profile"
        } 
    ],
    [   
        {
            element: "input",
            name: "cv",
            label: "Upload CV",
            type: "file", 
            required: true,
        },
        {
            element: "input",
            name: "cover_letter",
            label: "Upload Cover Letter",
            type: "file", 
            required: false,
        }
    ],
    [
        {
            element: "input",
            name: "about_you",
            label: "About you",
            type: "text", 
            required: true,
            dataTarget: "about_you"
        }
    ],
    [
        {
            element: "div", 
            name: "summary", 
            label: "summary", 
            type: "text", 
            required: false,
            dataTarget: "" 

        }
    ]
]