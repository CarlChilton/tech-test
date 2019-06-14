export default [
    {   
        name: "your-details",
        title: "About you", 
        description: "Let us know who you are and how to contact you",
        data: [
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
                type: "tel",
                required: false,
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
        ]
    },
    {   
        name: "git_profile",
        title: "Git profile", 
        description: "Search for your profile and add it to the form",
        data: [
            {
                element: "input",
                name: "git_profile",
                label: "Git profile",
                type: "search", 
                required: false,            
                dataTarget: "git_profile",
                title: "Please search for and select your github profile before continuing"
            }
        ]
    },
    {   
        name: "add-files",
        title: "Add your CV and Cover Letter", 
        description: "Upload the most recent version of your CV and cover letter",
        data: [
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
                required: true,
            }
        ]
    },
    {   
        name: "about-you",
        title: "About you", 
        description: "Give us a brief description about yourself",
        data: [
            {
                element: "input",
                name: "about_you",
                label: "About you",
                type: "text", 
                required: true,
                dataTarget: "about_you"
            }
        ]
    },
    {   
        name: "summary",
        title: "Almost there", 
        description: "Please check your details below. If you're happy, click FINISH",
        data: [
            {
                element: "div", 
                name: "summary", 
                label: "summary", 
                type: "text", 
                required: false,
                dataTarget: "" 
            }
        ]
    }    
]