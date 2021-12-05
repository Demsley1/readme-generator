// add inquire module from npm website
const inquirer = require('inquirer');
// add fucntions returned from page that creates the readme template
const markDown = require('./Utils/generateMarkdown')
// add function to create the readme file using the teplate from markDown
const { writeToFile } = require('./Utils/generateReadme')

// Create an array of questions for user input using inquirer modules rules
const promptUser = () => {
    return inquirer.prompt ([
        {
            name: 'name',
            message: 'What is your name?',
            validate: name => {
                if(name){
                    return true;
                }
                else {
                    console.log("Your name is required, provide a relevant value")
                    return false;
                }
            },
        },
        {
            name: 'username',
            mesage: 'What is your Github Username?',
            validate: gitHubUser => {
                if(gitHubUser){
                    return true;
                }
                else {
                    console.log('We need your GitHb username (Required)')
                    return false;
                }
            }
        },
        {
            name: 'email',
            message: 'Provide your main work email:',
            validate: email => {
                if(email){
                    return true;
                }
                else{
                    console.log("You will need to provide a email address for users/viewers to communicate with you")
                    return false;
                }
            }
        },
    ]);
};

const projectPrompt = projectData => {
    // create an array for the project data if one doesnt exist already
    if(!projectData.projects){
        projectData.projects = [];
    }
    console.log( `
    ===============
    Explain Project
    ===============
    `);
    return inquirer.prompt ([
        {
            name: 'title',
            message: 'What is the title of your project?',
            validate: projectTitle => {
                if(projectTitle){
                    return true;
                }
                else {
                    console.log("Please provide a title for your project!")
                    return false;
                }

            }

        },
        {
            name: 'description',
            message: 'Write a description for the project you created:',
            validate: projectDescription => {
                if( projectDescription) {     
                    return true;
                }
                else {
                    console.log('You need to enter some form of description (Required)')
                    return false;
                }
            }
        },
        {
            name: 'install',
            message: 'Provide a set of clear instructions for users to install app:',
            validate: install => {
                if(install){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        {
            name: 'usage',
            message: 'Provide a set of clear instructions detailing the correct use of your app and its purpose:',
            validate: usageInfo => {
                if(usageInfo){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        {
            name: 'contribution',
            message: 'Create a list of rules for contribution (write your contribtuion rules as a markdown list using "-" to signify each point):',
            validate: contribute => {
                if(contribute){
                    return true;
                }
                else {
                    console.log("It is recommended that you write down rules for contributig to the project")
                    return false;
                }
            }
        },
        {
            name: 'test',
            message: 'Instructions for users to test your code and app.'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a license to be displayed for your project and a description of that license will follow',
            choices: ['ApacheLicense', 'GNUGPLv3', 'MIT', 'ISC'],
            validate: license => {
                if(license){
                    return true;
                }
                else{
                    console.log("the license for your project will tell users how they use and distribute the information found in your repo.")
                    return false;
                }
            }
        }
    ]).then(projectInfo => {
        projectData.projects.push(projectInfo)
        console.log(projectData)
        return projectData;
    });
}

// run the prompts and then return the answers to be used again for another instance of .then() methods.
promptUser()
    .then(projectPrompt)
    .then(projectData => {
        return markDown(projectData);
    })
    .then(readmePage => {
        return writeToFile(readmePage);
    })
    .then(writeToFileResponse => {
        console.log(writeToFileResponse)
    })
    .catch(err => {
        console.log(err);
    });
